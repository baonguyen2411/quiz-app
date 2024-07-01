import { useEffect, useState } from "react";

const useCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((resp) => {
        return resp.json();
      })
      .then((response) => {
        setCategories(response.trivia_categories);
      })
      .catch((error) => {
        console.log("Fetch categories error!", error?.message);
      });
  }, []);

  return [categories, setCategories];
};

export default useCategories;
