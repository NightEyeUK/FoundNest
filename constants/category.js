

export const category = ["Academic Material", "Clothing and Accessories", "Electronics", "Official Documents", "Personal Items", "Equipments" ]

export const getCategories = async () => {
  try {
    // Talk to the API, don't import the file!
    const response = await fetch('http://192.168.0.190:3000/api/categories'); 
    const res = await response.json();
    const data = res.map(item => item.category_name ); // Assuming your API returns objects with a 'name' field
    console.log("Frontend received these categories from the API:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
};