"use client";

import { use } from "react";
import Table from "@/components/Table";
import styles from "./page.module.css";
import ProtectedRoute from "@/contexts/auth/ProtectedRoute";
import Pagination from "@/components/Pagination";
import axiosRequest from "@/utils/axiosRequest";
import { USERS_LIST_LIMIT } from "@/constants/dataLimits";
import ROUTES from "@/constants/routes";
import Button from "@/components/Button";
import LinkButton from "@/components/LinkButton";
import { useAuth } from "@/contexts/auth/AuthProvider";

interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface IResponseUsersData {
  total: number;
  limit: number;
  offset: number;
  data: IUser[];
}

async function getData(params: any) {
  try {
    const limit = params.limit || USERS_LIST_LIMIT;
    const page = parseInt(params.page);
    const offset = (page && page >= 1 ? page - 1 : 0) * limit;
    const data = await axiosRequest({
      url: "/api/view",
      method: "get",
      headers: {
        "Cache-Control": "no-store",
      },
      params: {
        limit,
        offset,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
}

export default function ManageUsersPage({ searchParams }: any) {
  const data = use<IResponseUsersData>(getData(searchParams));

  const { logout } = useAuth();

  return (
    <ProtectedRoute>
      <div className={styles.container}>
        <div className={styles.actions}>
          <LinkButton href={ROUTES.REGISTRATION}>Create User</LinkButton>
          <Button onClick={logout}>Logout</Button>
        </div>
        <div className={styles.tableContainer}>
          <Table
            caption="Manage Users Table"
            columns={[
              { header: "ID", key: "id", minWidth: "16rem" },
              { header: "Name", key: "name", minWidth: "20rem" },
              { header: "Email", key: "email", minWidth: "16rem" },
              { header: "Phone", key: "phone", minWidth: "8rem" },
            ]}
            data={data.data}
            key="id"
            isIndexed
            offset={data.offset}
          />
          <div className={styles.paginationContainer}>
            <Pagination
              pageCount={
                data.data.length ? Math.ceil(data.total / data.limit) : 0
              }
              baseUrl={ROUTES.MANAGE_USERS}
              params={searchParams}
            />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
