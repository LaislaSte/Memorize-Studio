// HOOKS AND LIBS
import React, { useState, useEffect } from 'react';

// ARCHIVES FROM PROJECT
import './Review.css';
import { UserAuth } from '../../services/UserContext';
import { arrCategorys } from '../../utils/arraysHeader';

/*PAGES AND COMPONENTS */
import Navbar from '../../components/navbar/Navbar';
import ReviewButton from '../../components/reviewbutton/ReviewButton';
import { Post } from '../../components/post/Post';
import CreateButton from '../../components/createbutton/CreateButton';
import LikeButton from '../../components/likebutton/LikeButton';
import Categorys from '../../components/categorys/Categorys';

const Review = () => {
  //states
  const [query, setQuery] = useState('');

  //imports
  const { reviews, getReviews, categorys } = UserAuth();

  //useEffect para pegar as revisões
  useEffect(() => {
    const callReviews = () => {
      getReviews();
    };
    callReviews();
    // }
  }, []);

  return (
    <>
      <header className="header-main-filter">
        <Navbar />
        <CreateButton />
        <div className="aa">
          <h1>google ads</h1>
        </div>

        <div className="search-filter">
          <ul
            className="menu-item-category"
            onChange={(e) => {
              setQuery(e.target.value);
            }}>
            {categorys ? (
              <>
                <li
                  value="All"
                  className="item-category"
                  onClick={(e) => {
                    setQuery(e.target.value);
                  }}>
                  {' '}
                  Tudo{' '}
                </li>
                {categorys.map((item, index) => {
                  return (
                    <Categorys item={item} key={index} funSetQuery={setQuery} />
                  );
                })}
              </>
            ) : (
              <>
                <li
                  value="All"
                  className="item-category"
                  onClick={(e) => {
                    setQuery(e.target.value);
                  }}>
                  {' '}
                  Tudo{' '}
                </li>
                {arrCategorys.map((item, index) => {
                  return (
                    <Categorys item={item} key={index} funSetQuery={setQuery} />
                  );
                })}
              </>
            )}
          </ul>
        </div>
      </header>

      <main className="posts-container">
        {query.length > 2 && (
          <div className="result-search-container-posts">
            {reviews
              .filter((item) => item.category.includes(query))
              .map((doc) => {
                return (
                  <Post
                    postId={doc.postId}
                    user_id={doc.user_id}
                    user_name={doc.user_name}
                    avatar={doc.avatar}
                    title={doc.title}
                    category={doc.category}
                    content={doc.content}
                    img_content={doc.img_content}
                    click_type_like={
                      <LikeButton postId={doc.postId} reviewId={doc.id} />
                    }
                    click_type_review={
                      <ReviewButton
                        reviewId={doc.id}
                        currentCounter={doc.counter}
                      />
                    }
                  />
                );
              })}
          </div>
        )}

        {reviews.map((doc) => {
          return (
            <Post
              postId={doc.postId}
              user_id={doc.uid}
              user_name={doc.name}
              avatar={doc.userPhoto}
              title={doc.title}
              category={doc.category}
              content={doc.content}
              img_content={doc.imgContent}
              click_type_like={
                <LikeButton postId={doc.postId} reviewId={doc.id} />
              }
              click_type_review={
                <ReviewButton reviewId={doc.id} currentCounter={doc.counter} />
              }
            />
          );
        })}
      </main>
    </>
  );
};

export default Review;
