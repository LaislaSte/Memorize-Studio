// HOOKS AND LIBS
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// auth:
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, onAuthStateChanged, updateProfile, updateEmail, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
// firestore: 
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc, query, where, increment, arrayUnion, arrayRemove, serverTimestamp, orderBy } from "firebase/firestore";
//moment:
import moment from 'moment/moment';

// ARCHIVES FROM PROJECT
import { db, auth, provider, storage } from './Banco';
import { deleteObject, listAll, ref } from 'firebase/storage';

//instanciado um objeto com o Hook do react createContext
export const CostumerContext = createContext();
//referenciando a coleção do banco de dados a ser usada
const collectionRef = collection(db, 'users');

export const CostumerProvider = ({ children }) => {
    //states
    // dados do usuários:
    const [user, setUser] = useState(null);
    const [uid, setUid] = useState(null);
    const [id, setId] = useState('');
    const [imgUrl, setImgUrl] = useState(null);
    const [bios, setBios] = useState('');
    const [name, setName] = useState('');
    const [categorys, setCategorys] = useState('');
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [authProviderUser, setAuthProviderUser] = useState('');
    const [uposts, setUposts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [allReviews, setAllReviews] = useState([]);

    // dados do feed
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [notification, setNotificatio] = useState(false);

    //instanciado um navigate para navegação de rotas
    const navigate = useNavigate();


    // useEffect 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setUid(currentUser.uid);
            setName(currentUser.displayName);
            setImgUrl(currentUser.photoURL);
            getUserId();
            getUsers();
            getPosts();
            getReviews();
        });
        return () => {
            unsubscribe();
        };
    }, []);

    /* ================================
        FUNÇÕES PARA OS USERS 
    =================================== */

    //pega as informações do user logado e seus posts
    const getUserId = async () => {
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);

        try {
            for (var i in querySnapshot.docs) {
                const doc = querySnapshot.docs[i]
                setId(doc.id);
                setName(doc.data().name ? doc.data().name : user.displayName);
                setImgUrl(doc.data().imgURL ? doc.data().imgURL : user.photoURL);
                setBios(doc.data().userBio);
                setCategorys(doc.data().userCategorys);
                setAuthProviderUser(doc.data().authProvider);
                setFollowing(doc.data().following ? doc.data().following : []);
                setFollowers(doc.data().followers ? doc.data().followers : []);

                if (name) {
                    break
                }
            }

        } catch (error) {
            console.log(error);
        }

        const userPosts = posts.filter(post => post.user_id === uid);
        setUposts(userPosts);
    }

    // que pegue todos os users da coleção, para realizar filtragens e mais 
    const getUsers = async () => {
        const q = query(collection(db, "users"));
        const querySnapshot = await getDocs(q);
        const d = []

        try {
            querySnapshot.forEach((doc) => {
                const userObj = {
                    euid: doc.data().uid,
                    ename: doc.data().name ? doc.data().name : null,
                    eavatar: doc.data().imgURL ? doc.data().imgURL : null,
                    ebios: doc.data().userBio ? doc.data().userBio : null,
                    efollowers: doc.data().followers ? doc.data().followers : [],
                    efollowing: doc.data().following ? doc.data().following : []
                }
                d.push(userObj);
            });

            setUsers(d);

        } catch (error) {
            console.log(error);
        }

    }

    //FUNÇÃO PARA CADASTRO COM O AUTHENTICATED E FIRESTORE
    const registerWithEmailAndPassword = async (name, email, password) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const user = res.user;
            await addDoc(collectionRef, {
                uid: user.uid,
                name: name,
                imgURL: user.photoURL,
                password,
                authProvider: "local",
                email,
                following: [],
                followers: []
            });
            setName(name);
            alert('usuario cadastrado no banco!');
            getUsers();
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    //FUNÇÃO PARA EXCLUIR USER COM O AUTHENTICATION, FIRESTORE E STORAGE
    //excluir todas as instancias desse usuarios, como os post, revisões e imagens cadastradas
    const revomeUser = async (password) => {
        const providerQuery = query(collection(db, 'users'), where('uid', '==', uid));
        const providerSnapshot = await getDocs(providerQuery);
        let providerLogin = ''
        providerSnapshot.forEach(doc => {
            providerLogin = doc.data().authProvider
        })

        if (providerLogin === 'local') {
            const credential = EmailAuthProvider.credential(
                auth.currentUser.email,
                password
            )
            await reauthenticateWithCredential(auth.currentUser, credential);
            //removendo do authentication
            deleteUser(auth.currentUser).then(() => {
                console.log('usuário deletado: AUTH');
            }).catch((error) => {
                console.log(error, ': AUTH');
                alert(error.message);
            });
        }

        if (providerLogin === 'google') {
            // Sign in using a popup.
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const googleCredential = GoogleAuthProvider.credentialFromResult(result);
            await reauthenticateWithCredential(auth.currentUser, googleCredential);
            //removendo do authentication
            deleteUser(auth.currentUser).then(() => {
                console.log('usuário deletado: AUTH');
            }).catch((error) => {
                console.log(error, ': AUTH');
                alert(error.message);
            });
        }

        //removendo do banco de dados
        deleteDoc(doc(db, 'users', id)).then(() => {
            console.log('usuário deletado: DB')
        }).catch((error) => {
            console.error(error);
            alert(error.message);
        })

        //deletando do banco os posts desse usuário
        const secondq = query(collection(db, "post"), where("uid", "==", uid));
        getDocs(secondq).then(res => {
            res.forEach((doc) => {
                deletePost(doc.id, doc.data().imgContent);
            })
        }).then(() => {
            console.log('posts do usuário deletado: DB')
        }).catch((error) => {
            console.log(error);
            alert(error.message);
        })

        //deletando do banco as revisões desse usuário
        const thirdq = query(collection(db, "revision"), where("userAdded", "==", uid));
        const deleteReview = (reviewId) => {
            deleteDoc(doc(db, 'revision', reviewId));
        }
        getDocs(thirdq).then(res => {
            res.forEach((doc) => {
                deleteReview(doc.id)
            })
        }).then(() => {
            console.log('revisões do usuário deletadas: DB')
        }).catch((error) => {
            console.log(error);
            alert(error.message);
        })

        // Create a reference under which you want to list
        const postsRef = ref(storage, `/postContent/user:${uid}`);
        const profileRef = ref(storage, `/profile/user:${uid}`);

        // Find all the prefixes and items.
        listAll(postsRef)
            .then((res) => {
                res.items.forEach((itemRef) => {
                    if (itemRef !== null) {
                        const imgRef = ref(storage, itemRef);
                        deleteObject(imgRef).then(() => {
                            // File deleted successfully
                            console.log('reference deletada hi from imgReference: ');
                        }).catch((error) => {
                            console.log(error);
                        });
                    }
                });
            }).catch((error) => {
                console.log(error);
                alert(error.message);
            });

        listAll(profileRef)
            .then((res) => {
                res.items.forEach((itemRef) => {
                    // All the items under listRef.
                    if (itemRef !== null) {
                        const imgRef = ref(storage, itemRef);
                        deleteObject(imgRef).then(() => {
                            // File deleted successfully
                            console.log('reference deletada hi from imgReference: ');
                        }).catch((error) => {
                            console.log(error);
                        });
                    }
                });
            }).catch((error) => {
                console.log(error);
                alert(error.message);
            });

    }

    //FUNÇÕES DE LOGIN, LOGIN COM GOOGLE E LOGOUT
    const logInWithEmailAndPassword = async (email, password) => {
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            res.user ? navigate('explore') : navigate('/login');
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const userGoogle = result.user;
                setUser(userGoogle);
                const q = query(collectionRef, where("uid", "==", userGoogle.uid));
                const docs = getDocs(q);
                if (docs.docs.length === 0) {
                    addDoc(collectionRef, {
                        uid: user.uid,
                        name: user.displayName,
                        authProvider: "google",
                        email: user.email,
                        imgURL: user.photoURL,
                        following: [],
                        followers: []
                    });
                }

                navigate('/explore');
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                alert(errorCode, errorMessage, email, credential);
            });
    }

    const logout = () => {
        try {
            //função do provider para deslogar
            signOut(auth);
            setUser(null);
            setUid(null);
            setId('');
            setImgUrl(null);
            setBios('');
            setName('');
            setCategorys('');
            setFollowing([]);
            setFollowers([]);
            setAuthProviderUser('');
            setUposts([]);
            setReviews([]);
            setAllReviews([]);
            setNotificatio(false);
            navigate('/');
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    };

    //FUNÇÕES DE ATUALIZAÇÃO
    const updateUserProfile = (imgURL, name_user, bios_user, categorys) => {

        //atualizando nome e foto no provider
        updateProfile(user, {
            displayName: name_user,
            photoURL: imgURL
        }).then(() => {
            console.log('usuário atializado: AUTH');
        }).catch((error) => {
            console.log(error);
            alert(error.message);
        })

        //atualizando informações no banco
        updateDoc(doc(db, "users", id), {
            userBio: bios_user,
            userCategorys: categorys,
            name: name_user,
            imgURL: imgURL
        }).then(docRef => {
            console.log(docRef, 'usuário atualizado: DB');
            setBios(bios_user);
            setName(name_user);
            setImgUrl(imgURL);
            setCategorys(categorys);
        }).catch((error) => {
            console.log('updateDoc error: ', error);
            alert(error.message);
        })
    }

    //para atualizar senha quando usuário não estiver logado
    const updateUserPasswordLogOut = async (email) => {
        const q = query(collection(db, "users"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        let validEmail = null;
        querySnapshot.forEach((doc) => {
            validEmail = doc.data().email
        });
        // se não existir um e-mail fornecido:
        if (validEmail) {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    alert('E-mail de redefinição de senha enviado');
                    navigate('/login');
                })
                .catch((error) => {
                    console.log(error);
                    alert(error.message, error.code);
                });
        } else {
            alert('E-mail não cadastrado! Cadastre-se no site ou coloque um e-mail cadastrado');
        }
    }

    const updateUserPasswordLogIn = async (email) => {
        const q = query(collection(db, "users"), where('uid', '==', uid), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);
        let validEmail = '';
        querySnapshot.forEach((doc) => {
            validEmail = doc.data().email
        });
        if (validEmail) {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    alert('E-mail de redefinição de senha enviado/ e-mail existente no db');
                    navigate('/config');
                })
                .catch((error) => {
                    console.log(error);
                    alert(error.message, error.code);
                });
        } else {
            alert('Não encontramos nenhum e-mail relacionado à sua conta');
        }
    }

    const updateUserEmail = async (email, password) => {
        const credential = EmailAuthProvider.credential(
            auth.currentUser.email,
            password
        )
        await reauthenticateWithCredential(auth.currentUser, credential)

        updateEmail(auth.currentUser, email).then(() => {
            alert('E-mail atualizado');
            navigate('/config');
        }).catch((error) => {
            console.log(error);
            alert(error.message);
        });
    }

    //função para atualizar numero de seguidores e seguindo
    const addFollowing = async (euid) => {
        //atualizando doc do usuário logado adicionando em um array (following) o uid que que ele quer seguir
        try {
            await updateDoc(doc(db, "users", id), {
                following: arrayUnion(euid)
            });
            getUsers();
            alert('adicionado aos seguidos');
        } catch (error) {
            console.log(error);
        }

        //para adicionar o uid do usuário logado aos dados do user a quem ele está seguindo (o outro ganha um seguidor)
        const q = query(collection(db, "users"), where("uid", "==", euid));
        const querySnapshot = await getDocs(q);
        let eid = '';
        querySnapshot.forEach((doc) => {
            eid = doc.id
        });
        try {
            await updateDoc(doc(db, "users", eid), {
                followers: arrayUnion(uid)
            });
            getUsers();
            alert('add novo seguidor ao perfil');
        } catch (error) {
            console.log(error)
        }

    }

    const removeFollowing = async (euid) => {
        try {
            await updateDoc(doc(db, "users", id), {
                following: arrayRemove(euid)
            });
            getUsers();
            alert('removendo da lista de seguindo');
        } catch (error) {
            console.log(error);
            alert(error.message);
        }

        //para remover o uid do usuário logado dos dados do user a quem ele está seguindo
        const q = query(collection(db, "users"), where("uid", "==", euid));
        const querySnapshot = await getDocs(q);
        let eid = '';
        querySnapshot.forEach((doc) => {
            eid = doc.id
        });
        try {
            await updateDoc(doc(db, "users", eid), {
                followers: arrayRemove(uid)
            });
            getUsers();
            alert('removido dos seguidos');
        } catch (error) {
            console.log(error);
            alert(error.message);
        }

    }

    //funções dos comentários
    const addComent = async (idPost, content, imgContent) => {
        try {
            await addDoc(collection(db, "post"), {
                uid: uid,
                userPhoto: user?.photoURL ? user?.photoURL : null,
                name: name,
                content: content,
                img_content: imgContent ? imgContent : null,
                postFather: idPost,
                date: serverTimestamp()
            });
            await updateDoc(doc(db, 'post', idPost), {
                coments: increment(1)
            });
            getPosts();

        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }

    const updateComent = (comentId, content, imgContent) => {
        updateDoc(doc(db, 'post', comentId), {
            content: content,
            imgContent: imgContent
        }).then(() => {
            alert('comentáio atualizado');
            getPosts();
        }).catch((error) => {
            console.log(error);
            alert(error.message);
        });
    }
    const removeComent = (comentId, idPost, itemRef) => {
        deleteDoc(doc(db, 'post', comentId))
            .then(() => {
                alert('comentário deletado');
            })
            .catch((error) => {
                console.log(error);
                alert(error.message);
            });

        updateDoc(doc(db, 'post', idPost), {
            coments: increment(-1)
        }).then(() => {
            alert('comentarios de post atualizado');
            getPosts();
        }).catch((error) => {
            console.log(error);
            alert(error.message);
        });

        if (itemRef !== null) {
            const imgRef = ref(storage, itemRef);
            deleteObject(imgRef).then(() => {
                // File deleted successfully
                console.log('reference deletada hi from imgReference: ');
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    /* ================================
        FUNÇÕES PARA OS POSTS 
    =================================== */

    // FUNÇÃO DE CADASTRO DE POST 
    const registerPost = async (title, content, cat, img_content) => {
        try {
            const createdPost = await addDoc(collection(db, "post"), {
                uid: user?.uid,
                userPhoto: imgUrl ? imgUrl : null,
                name: name,
                title: title,
                content: content,
                category: cat,
                imgContent: img_content ? img_content : null,
                likes: 0,
                coments: 0,
                date: serverTimestamp()
            });

            registerReview(
                createdPost.id,
                uid,
                user?.photoURL ? user?.photoURL : null,
                img_content ? img_content : null,
                name,
                title,
                content,
                cat
            );

            addLikePost(createdPost.id);

            getPosts();
            getUserId();
            getReviews();
            alert('Flashcard criado!');
        } catch (err) {
            console.log(err);
            alert(err.message);
        }

    }

    // que pegue todos os posts da tabela para renderizar no explore 
    const getPosts = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "post"), orderBy("date", "desc"));
            const d = []
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                const post = {
                    id: doc.id,
                    user_name: doc.data().name,
                    user_id: doc.data().uid,
                    avatar: doc.data().userPhoto,
                    title: doc.data().title,
                    category: doc.data().category,
                    content: doc.data().content,
                    img_content: doc.data().imgContent,
                    likes: doc.data().likes,
                    coments: doc.data().coments,
                    postFather: doc.data().postFather
                }
                d.push(post);
            });

            if (d) {
                setPosts(d);
            }
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }

    //FUNÇÃO DE DELETAR POST
    const deletePost = async (postId, itemRef) => {
        deleteDoc(doc(db, 'post', postId)).then(() => {
            getPosts();
        });

        if (itemRef !== null) {
            const imgRef = ref(storage, itemRef);
            deleteObject(imgRef).then(() => {
                // File deleted successfully
                console.log('reference deletada hi from imgReference: ');
            }).catch((error) => {
                console.log(error);
            });
        }

        const q = query(collection(db, "revision"), where('postId', '==', postId), where('userAdded', '==', uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            deleteDoc(doc(db, 'revision', doc.id));
        });
    }

    //FUNÇÃO DE ATUALIZAR POST
    const updatePost = async (postId, title, cat, content, img_content) => {
        updateDoc(doc(db, 'post', postId), {
            title: title,
            category: cat,
            content: content,
            imgContent: img_content,
        }).then(() => {
            alert('Mudança no post feita');
        }).catch((error) => {
            console.log(error);
            alert(error.message);
        });

        const q = query(collection(db, "revision"), where('postId', '==', postId));
        const querySnapshot = await getDocs(q);
        let reviewId = ''
        querySnapshot.forEach((doc) => {
            reviewId = doc.id
        });
        updateDoc(doc(db, 'revision', reviewId), {
            title: title,
            category: cat,
            content: content,
            imgContent: img_content
        }).then(() => {
            alert('Mudança na revisão feita');
        }).catch((error) => {
            console.log(error);
            alert(error.message);
        });

        getPosts();
        getUserId();
    }

    //para adicionar adicionar 1 like no post
    const addLikePost = (postId) => {
        updateDoc(doc(db, "post", postId), {
            likes: increment(1)
        }).then(() => {
            getPosts();
        })
    }
    //para remover 1 like no post
    const removeLikePost = (postId) => {
        updateDoc(doc(db, "post", postId), {
            likes: increment(-1)
        }).then(() => {
            getPosts();
        })
    }


    /* ================================
        FUNÇÕES PARA AS REVISÕES 
    =================================== */

    //cadastro de revisão
    const registerReview = async (postId, euid, userPhoto, imgContent, user_name, title, content, category) => {

        // neste caso ele é registrado no banco primeiramente com uma data que conta 5 horas a partir do momento instanciado
        // const futureDate = moment().add(1, 'm').format('YYYY-M-D');
        const futureDate = moment();
        futureDate.add(5, 'h');

        try {
            await addDoc(collection(db, "revision"), {
                postId: postId,
                uid: euid,
                userAdded: uid,
                userPhoto: userPhoto ? userPhoto : false,
                imgContent: imgContent ? imgContent : false,
                name: user_name,
                title: title,
                content: content,
                category: category,
                futureDate: futureDate.format('DD-MM-YYYY HH:mm').toString(),
                counter: 0
            });

            getReviews();
            getPosts();
            alert('Post adicionado nas revisões!');
        } catch (err) {
            console.log(err)
        }

    }

    //para deletar revisão
    const removeReview = async (postId, reviewId) => {
        if (reviewId) {
            deleteDoc(doc(db, 'revision', reviewId)).then(() => {
                alert('revisão deletada');
            }).catch((error) => {
                console.log(error);
                alert(error.message);
            })
        }

        if (!reviewId) {
            try {
                const q = query(collection(db, "revision"), where('postId', '==', postId), where('userAdded', '==', uid));
                const querySnapshot = await getDocs(q);
                let eid = ''
                querySnapshot.forEach((doc) => {
                    eid = doc.id
                })
                deleteDoc(doc(db, 'revision', eid));
                getReviews();
                getPosts();
                alert('revisão deletada');
            } catch (error) {
                console.log(error);
                alert(error.message);
            }
        }
    }

    // que pegue todos as reviews da tabela para renderizar na rota review de acordo com sua data certa
    const getReviews = async () => {
        // pegue todas as revisoes do usuário logado
        const q = query(collection(db, "revision"), where('userAdded', '==', uid));
        const querySnapshot = await getDocs(q);
        const d = [];
        const allData = [];

        querySnapshot.forEach((doc) => {
            //para cada revisão pegue a data do documento para fazer comparação
            const currentMoment = doc.data().futureDate;
            //transformando numa instancia de tempo
            const a = moment(currentMoment, "DD-MM-YYYY HH:mm", true);
            //instanciando um momento atual para fazer comparações:
            const currentDate = moment();
            //se a data desse doc for anterior a atual ou a mesma que a atual, pegue os dados desse doc e coloque em reviews
            // if (a.isBefore(currentDate) || a.isSame(currentDate) ) {
            if (!a.isAfter(currentDate)) {
                const review = {
                    id: doc.id,
                    postId: doc.data().postId,
                    userAdded: doc.data().userAdded,
                    uid: doc.data().uid,
                    userPhoto: doc.data().userPhoto,
                    imgContent: doc.data().imgContent,
                    name: doc.data().name,
                    title: doc.data().title,
                    content: doc.data().content,
                    category: doc.data().category,
                    futureDate: doc.data().futureDate,
                    counter: doc.data().counter
                }
                d.push(review);
            }
        });

        if (d) {
            setReviews(d);
        }
        if (reviews.length >= 5) {
            setNotificatio(true);
        }

        querySnapshot.forEach((doc) => {
            const review = {
                id: doc.id,
                postId: doc.data().postId,
                userAdded: doc.data().userAdded,
                uid: doc.data().uid,
                userPhoto: doc.data().userPhoto,
                imgContent: doc.data().imgContent,
                name: doc.data().name,
                title: doc.data().title,
                content: doc.data().content,
                category: doc.data().category,
                futureDate: doc.data().futureDate,
                counter: doc.data().counter
            }
            allData.push(review);
            setAllReviews(allData);
        })
    }

    //FUNÇÃO PARA ATUALIZAR DATA DE REVISÃO
    const updateReview = async (reviewId, newDate, counter) => {
        // ao clicar no btn já revisei a revisao é atualizada para uma nova data de revisao e um novo contador
        try {
            await updateDoc(doc(db, 'revision', reviewId), {
                futureDate: newDate,
                counter: counter
            })
            getReviews();
        } catch (error) {
            console.log(error)
        }
    }


    //INSTANCIA COSTUMER CONTEXT SENDO RETORNADA NO COMPONENTE PASSANDO PARA O SEU PROVEDOR AS FUNÇÕES CRUD, LOGIN E LOGOUT
    return (
        <CostumerContext.Provider value={{
            user, uid, id, imgUrl, bios, categorys, uposts, followers, following, authProviderUser,
            users, posts,
            reviews, notification, allReviews,

            registerWithEmailAndPassword, logInWithEmailAndPassword, signInWithGoogle, logout,
            updateUserPasswordLogOut, updateUserPasswordLogIn, updateUserEmail,

            getUsers, getUserId, updateUserProfile, revomeUser, addFollowing, removeFollowing,

            getPosts, registerPost, updatePost, deletePost, addLikePost, removeLikePost, addComent, removeComent, updateComent,

            registerReview, getReviews, updateReview, removeReview
        }}>
            {children}
        </CostumerContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(CostumerContext);
};