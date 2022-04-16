// Cria interface para representar as ordens no nosso sistema
interface IOrders {
  id: number;
  userId?: number;
  products: number[];
}

export default IOrders;