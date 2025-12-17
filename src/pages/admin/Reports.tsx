import { useEffect, useState } from 'react';
import { getAllOrders } from '../../services/api';
import type { PurchaseOrder } from '../../types/Order';
import "../../styles/admin.css";

interface SalesData {
  period: string;
  revenue: number;
  orders: number;
  averageOrder: number;
}

interface TopProduct {
  id: string;
  name: string;
  sales: number;
  revenue: number;
}

export function ReportsPage() {
  const [dateRange, setDateRange] = useState('month');
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);

  useEffect(() => {
    const fetchOrdersAndCalculateReports = async () => {
      try {
        const orders: PurchaseOrder[] = await getAllOrders();
        
        // Calcular ventas por mes
        const monthlySales: { [key: string]: { revenue: number, ordersCount: number } } = {};

        orders.forEach(order => {
          const orderDate = new Date(order.orderDate);
          const month = orderDate.toLocaleString('default', { month: 'long', year: 'numeric' });
          
          if (!monthlySales[month]) {
            monthlySales[month] = { revenue: 0, ordersCount: 0 };
          }
          
          monthlySales[month].revenue += order.totalPrice;
          monthlySales[month].ordersCount += 1;
        });

        const salesDataArray = Object.keys(monthlySales).map(month => ({
          period: month,
          revenue: monthlySales[month].revenue,
          orders: monthlySales[month].ordersCount,
          averageOrder: monthlySales[month].revenue / monthlySales[month].ordersCount,
        }));

        setSalesData(salesDataArray);

        // Calcular productos más vendidos
        const productSales: { [key: string]: { id: string, name: string, sales: number, revenue: number } } = {};
        orders.forEach(order => {
          order.items.forEach(item => {
            if (productSales[item.productName]) {
              productSales[item.productName].sales += item.quantity;
              productSales[item.productName].revenue += item.price * item.quantity;
            } else {
              productSales[item.productName] = { 
                id: String(item.productId), 
                name: item.productName, 
                sales: item.quantity,
                revenue: item.price * item.quantity
              };
            }
          });
        });

        const sortedTopProducts = Object.values(productSales)
          .sort((a, b) => b.sales - a.sales)
          .slice(0, 5);
        
        setTopProducts(sortedTopProducts);

      } catch (error) {
        console.error("Error fetching or processing orders for reports:", error);
      }
    };

    fetchOrdersAndCalculateReports();
  }, []);

  const handleExportReport = () => {
    // Preparar contenido CSV
    let csvContent = 'data:text/csv;charset=utf-8,';
    
    // Añadir sección de Resumen de Ventas
    csvContent += 'SALES OVERVIEW\n';
    csvContent += 'Period,Revenue,Orders,Average Order Value\n';
    
    salesData.forEach(data => {
      csvContent += `"${data.period}",${data.revenue.toFixed(2)},${data.orders},${data.averageOrder.toFixed(2)}\n`;
    });
    
    csvContent += '\n\nTOP SELLING PRODUCTS\n';
    csvContent += 'Product,Units Sold,Revenue\n';
    
    topProducts.forEach(product => {
      csvContent += `"${product.name}",${product.sales},${product.revenue.toFixed(2)}\n`;
    });
    
    // Crear enlace de descarga
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sales-report-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    
    link.click();
    
    document.body.removeChild(link);
  };

  return (
    <>
          <div className="admin-header">
            <h1>Sales Reports</h1>
            <div className="admin-actions">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="date-range-select"
              >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
                <option value="year">Last Year</option>
              </select>
              <button className="primary-button" onClick={handleExportReport}>
                <i className="fas fa-download"></i> Export Report
              </button>
            </div>
          </div>

          <div className="reports-grid">
            {/* Sales Overview Cards */}
            <div className="report-card sales-overview admin-card">
              <h2>Sales Overview</h2>
              <div className="metrics-grid">
                {salesData.map((data, index) => (
                  <div key={index} className="metric-card">
                    <h3>{data.period}</h3>
                    <div className="metric-stats">
                      <div className="metric-item">
                        <label>Revenue</label>
                        <span className="value">${data.revenue.toFixed(2)}</span>
                      </div>
                      <div className="metric-item">
                        <label>Orders</label>
                        <span className="value">{data.orders}</span>
                      </div>
                      <div className="metric-item">
                        <label>Avg. Order</label>
                        <span className="value">${data.averageOrder.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Productos */}
            <div className="report-card top-products admin-card">
              <h2>Top Selling Products</h2>
              <div className="table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Sales</th>
                      <th>Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts.map(product => (
                      <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.sales} units</td>
                        <td>${product.revenue.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
  );
}