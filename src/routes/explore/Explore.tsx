// HOOKS AND LIBS 
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";

// ARCHIVES FROM PROJECT
import './Explore.css';
import { UserAuth } from "../../services/UserContext";
import { arrCategorys } from "../../utils/arraysHeader";

/*PAGES AND COMPONENTS */
import LikeButton from '../../components/likebutton/LikeButton';
import { Post } from '../../components/post/Post';
import Navbar from '../../components/navbar/Navbar';
import CreateButton from "../../components/createbutton/CreateButton";
import Input from "../../components/input/Input";
import SearchUser from "./SearchUser";
import Categorys from "../../components/categorys/Categorys";

const Explore = () => {
    //states for search
    const [query, setQuery] = useState("");

    // imports 
    const { getPosts, getReviews, getUsers, users, posts, categorys } = UserAuth();

    // useeffect 
    useEffect(() => {
        const getAllPosts = () => {
            getPosts();
            getUsers();
            getReviews();
        }
        getAllPosts();
    }, []);

    return (
        <>
            <header className="header-content-explore">
                <Navbar />
                <CreateButton />

                <div className="aa">
                    <h1>
                        google ads
                    </h1>
                </div>

                {/* elementos para pesquisa */}
                <ul className='menu-item-category'>
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



            {query.length > 2 && (
                <>

                    <div className="result-search-container-users">
                        {users.filter(item => item.ename.includes(query)).map(doc => {
                            return (
                                <SearchUser
                                    uid={doc.euid}
                                    name={doc.ename}
                                    avatar={doc.eavatar}
                                />
                            )
                        })}
                    </div>

                    <div className="result-search-container-posts">
                        {posts.filter(item => item.content.includes(query) || item.category.includes(query) || item.title.includes(query)).map(doc => {
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
                                    likes={doc.likes}
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
                    </div>
                </>
            )}

            <main className="posts-container">
                {posts.map(doc => {
                    return (
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
                    )
                })}

            </main>

        </>
    )
}

export default Explore