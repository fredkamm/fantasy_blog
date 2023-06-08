import React from 'react';
import { useQuery } from '@apollo/client';

import ThoughtList from '../components/ThoughtList';
import ThoughtForm from '../components/ThoughtForm';

import { QUERY_THOUGHTS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className=" bg-light col-12 col-md-10 mb-5 p-3"
          style={{ boxShadow: '0px 2px 2px 2px #ffff', borderRadius: '10px' }}
        >
          <ThoughtForm />
        </div>
        <div className="col-12 col-md-8 mt-3 mb-3" style={{ boxShadow: '0px 2px 2px 2px #ffff', borderRadius: '10px' }}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              title="Recent Takes..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
