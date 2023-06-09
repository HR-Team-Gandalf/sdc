import React, {useState, useEffect} from 'react';

const LoadMoreAnswers = ({handleLoadMoreAnswers, loadMoreVisible, loadMore, clickedQuestionIndex, index}) => {

  return (
    <span className='font-bold px-4'>
      {(loadMore && clickedQuestionIndex === index) ? <a module='seeMoreAnswers|QA' onClick={handleLoadMoreAnswers} href=''>Collapse Answers</a> : <a module='collapseAnswers|QA' onClick={handleLoadMoreAnswers} href=''>See More Answers</a>}
    </span>
  );
};

export default LoadMoreAnswers;