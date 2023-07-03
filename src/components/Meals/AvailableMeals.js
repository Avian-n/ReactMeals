import { useCallback, useEffect, useState } from 'react';
import useHttp from '../../hooks/use-http';

import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  const transformMeals = useCallback(mealsObj => {
    const loadedMeals = [];
    for (const key in mealsObj) {
      loadedMeals.push({
        id: key,
        name: mealsObj[key].name,
        description: mealsObj[key].description,
        price: mealsObj[key].price,
      });
    }

    setMeals(loadedMeals);
  }, []);

  const { isLoading, error, sendRequest: fetchMeals } = useHttp();

  useEffect(() => {
    fetchMeals(
      {
        url: 'https://react-course-30544-default-rtdb.europe-west1.firebasedatabase.app/Meals.json',
      },
      transformMeals
    );
  }, []);

  let content = <h2 className={classes.error}>No meals found</h2>;

  if (meals.length > 0) {
    const mealsList = meals.map(meal => (
      <MealItem
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
        id={meal.id}
      />
    ));

    if (!isLoading && !error) {
      content = <ul>{mealsList}</ul>;
    }
  }

  if (isLoading && !error) {
    content = <h2 className={classes.loading}>Loading...</h2>;
  }

  if (!isLoading && error) {
    content = <h2 className={classes.error}>Error loading meals</h2>;
  }

  return (
    <section className={classes.meals}>
      <Card>{content}</Card>
    </section>
  );
};

export default AvailableMeals;
