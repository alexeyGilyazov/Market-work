const api_url = 'http://localhost:8888/products';

export async function getProducts() {
  const response = await fetch(api_url);
  if (!response.ok) {
    throw new Error(response.statusText + 'error get data');
  }
  return response.json();
}

export async function addProducts(productsData) {
  const response = await fetch(api_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productsData),
  });
  if (!response.ok) {
    throw new Error(response.statusText + 'error add data');
  }
  return response.json();
}

export async function updateProducts(productsData) {
  const response = await fetch(`${api_url}/${productsData._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productsData),
  });
  if (!response.ok) {
    throw new Error(response.statusText + 'error update data');
  }
}

export async function deleteProducts(productId) {
  const response = await fetch(`${api_url}/${productId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(response.statusText + 'error delete data');
  }
  return productId
}