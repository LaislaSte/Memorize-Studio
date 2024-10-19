// HOOKS AND LIBS 
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";

// ARCHIVES FROM PROJECT
import { UserAuth } from "../../services/UserContext";
import { arrCategorys } from "../../utils/arraysHeader";

/*PAGES AND COMPONENTS */
import LikeButton from '../../components/likebutton/LikeButton';
import { Post } from '../../components/post/Post';
import Navbar from '../../components/navbar/Navbar';
import CreateButton from "../../components/createbutton/CreateButton";
import Input from "../../components/input/Input";
import Categorys from '../../components/categorys/Categorys';
import Modal from "../../components/modal/Modal";

const Following = () => {
    //states for search
    const [query, setQuery] = useState("");

    // imports 
    const { getPosts, getReviews, posts, categorys, following, getUserId } = UserAuth();

    // useeffect 
    useEffect(() => {
        const getAllPosts = () => {
            getUserId()
            getPosts();
            getReviews();
        }
        getAllPosts();
    }, []);

    return (
        <>
            <header className="header-content-explore">
                <Navbar />
                <CreateButton />
                <Modal />

                <div className="aa">
                    <h1>
                        google ads
                    </h1>
                </div>

                <ul className='menu-item-category' onChange={(e) => { setQuery(e.target.value); }} >
                    {categorys
                        ? (
                            <>
                                <li value="All" className="item-category" onClick={(e) => { setQuery(e.target.value) }}> Tudo </li>
                                {categorys.map((item, index) => {
                                    return (
                                        <Categorys
                                            item={item}
                                            key={index}
                                            funSetQuery={setQuery}
                                        />
                                    )
                                })}
                            </>
                        )
                        : (
                            <>
                                <li value="All" className="item-category" onClick={(e) => { setQuery(e.target.value) }} > Tudo </li>
                                {arrCategorys.map((item, index) => {
                                    return (
                                        <Categorys
                                            item={item}
                                            key={index}
                                            funSetQuery={setQuery}
                                        />
                                    )
                                })}
                            </>
                        )
                    }
                </ul>

                <div className="search-filter">
                    <Input
                        type="search"
                        className="input-outline-primary"
                        text="O que procura?"
                        icon={<BsSearch />}
                        value={query}
                        onchange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </header>

            <main className="posts-container">

                {following
                    ? (
                        <>
                            {query.length > 2 && (
                                <div className="result-search-container-posts">
                                    {following.map(id => {
                                        return (
                                            <>
                                                {posts.filter(post => post.user_id === id && post.content.includes(query) || post.category.includes(query) || post.title.includes(query) || post.user_name.includes(query)).map(doc => {
                                                    return (
                                                        <Post
                                                            postId={doc.id}
                                                            user_id={doc.user_id}
                                                            user_name={doc.user_name}
                                                            avatar={doc.avatar}
                                                            title={doc.title}
                                                            category={doc.category}
                                                            content={doc.content}
                                                            img_content={doc.img_content}
                                                            coments={doc.coments}
                                                            click_type_like={
                                                                < LikeButton
                                                                    postId={doc.id}
                                                                    uid={doc.user_id}
                                                                    userPhoto={doc.avatar ? doc.avatar : null}
                                                                    imgContent={doc.img_content}
                                                                    user_name={doc.user_name}
                                                                    title={doc.title}
                                                                    content={doc.content}
                                                                    category={doc.category}
                                                                />
                                                            }
                                                        />
                                                    )
                                                })}
                                            </>
                                        )
                                    })}





                                </div>
                            )}
                            {following.map(id => {
                                return (
                                    <>
                                        {posts.filter(post => post.user_id === id).map(doc => {
                                            return (
                                                <>
                                                    <Post
                                                        postId={doc.id}
                                                        user_id={doc.user_id}
                                                        user_name={doc.user_name}
                                                        avatar={doc.avatar ? doc.avatar : null}
                                                        title={doc.title}
                                                        category={doc.category}
                                                        content={doc.content}
                                                        img_content={doc.img_content}
                                                        likes={doc.likes}
                                                        coments={doc.coments}
                                                        click_type_like={
                                                            <LikeButton
                                                                postId={doc.id}
                                                                uid={doc.user_id}
                                                                userPhoto={doc.avatar ? doc.avatar : null}
                                                                imgContent={doc.img_content}
                                                                user_name={doc.user_name}
                                                                title={doc.title}
                                                                content={doc.content}
                                                                category={doc.category}
                                                            />
                                                        }
                                                    />
                                                </>
                                            )

                                        })}
                                    </>
                                )
                            })}
                        </>
                    )

                    : null
                }

            </main>

        </>
    )
}

export default Following