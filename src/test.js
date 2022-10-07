const CAR_LIST = [
  { id: 1, price: 1000 },
  { id: 2, price: 2000 },
  { id: 3, price: 6000 },
  { id: 4, price: 3000 },
  { id: 5, price: 3000 },
  { id: 6, price: 5000 },
  { id: 7, price: 4000 }
];

const findCarsInBudget = (cars, budget) => {
  const sortedCars = cars.sort((a, b) => a.price - b.price);
  let left = 0;
  let right = sortedCars.length - 1;
  let result = [];
  while (left < right) {
    if (sortedCars[left].price + sortedCars[right].price <= budget) {
      for (let k = left + 1; k <= right; k++) {
        result.push(`${sortedCars[left].id}-${sortedCars[k].id}`);
      }
      left++;
    }
    right--;
  }
  return result;
};

findCarsInBudget(CAR_LIST, 5000);
