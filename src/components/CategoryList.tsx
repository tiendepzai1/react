import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Table, Button, Spin, Alert } from "antd";

// Interface định nghĩa kiểu dữ liệu danh mục
interface Category {
  id: number;
  name: string;
}

// Hàm gọi API lấy danh sách danh mục
const fetchCategory = async (): Promise<Category[]> => {
  const { data } = await axios.get("http://localhost:3001/category");
  return data;
};

const CategoryList: React.FC = () => {
  const {
    data: categories,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["category"],
    queryFn: fetchCategory,
  });

  // Cấu hình cột bảng
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a: Category, b: Category) => a.id - b.id, // Cho phép sắp xếp theo ID
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
      sorter: (a: Category, b: Category) => a.name.localeCompare(b.name), // Sắp xếp theo tên
    },
  ];

  if (error) {
    return (
      <Alert
        message="Lỗi"
        description="Không thể tải dữ liệu danh mục. Vui lòng thử lại!"
        type="error"
        showIcon
      />
    );
  }

  return (
    <div>
      <h2>Danh sách danh mục</h2>

      <Button
        type="primary"
        onClick={() => refetch()}
        style={{ marginBottom: 16 }}
        disabled={isLoading}
      >
        Làm mới dữ liệu
      </Button>

      <Table
        dataSource={categories}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default CategoryList;
