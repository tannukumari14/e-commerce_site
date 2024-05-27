import React, { useEffect, useState } from 'react';

const Clothes = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = 'https://api.escuelajs.co/api/v1/categories';

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Limit the categories to only 5
        const formattedData = data.slice(0, 5).map(category => ({
          id: category.id,
          name: category.name,
          image: category.image
        }));

        setCategories(formattedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="product-container">
      <h1 className="product-title">Featured Categories
      <a href='./Electronices' className='link'>View All</a>
      </h1>
      <div className="product-list">
        {loading ? (
          <p>Loading...</p>
        ) : (
          categories.map(category => (
            <div key={category.id} className="product-item">
              <img
                src={category.image}
                alt={category.name}
                className="product-image"
              />
              <h2 className="product-title">{category.name}</h2>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Clothes;
