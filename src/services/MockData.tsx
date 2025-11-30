import { TABLES } from './db';
import type { Post } from '../types/BlogPost';
import type { Product } from '../types/Product';
import type { Category } from '../types/Category';
import type { User } from '../types/User';

type TableName = "POST" | "PRODUCT" | "CATEGORY" | "USER";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class MockDataService {
    private isConnected = false;

    connect() {
        this.isConnected = true;
        console.log("Mock data service connected.");
    }

    disconnect() {
        this.isConnected = false;
        console.log("Mock data service disconnected.");
    }

    async fetchData(tableName: TableName): Promise<Post[] | Product[] | Category[] | User[]> {
        if (!this.isConnected) {
            throw new Error("Service is not connected. Call connect() first.");
        }

        await delay(500);

        if (TABLES[tableName]) {
            return TABLES[tableName].content;
        }

        throw new Error(`Table "${tableName}" not found.`);
    }
}

export const MockData = new MockDataService();
