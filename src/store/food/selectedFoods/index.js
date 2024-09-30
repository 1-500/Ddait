import { create } from 'zustand';

const useSelectedFoodsStore = create((set) => ({
  foodList: [], // 초기 상태: 빈 배열
  addFood: (food) =>
    set((state) => ({
      foodList: [...state.foodList, food],
    })),
  removeFood: (foodId) =>
    set((state) => ({
      foodList: state.foodList.filter((food) => food.id !== foodId), // foodId로 필터링하여 제거
    })),
  clearFoodNutrition: () => set({ foodList: [] }),
}));

export default useSelectedFoodsStore;
