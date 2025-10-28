import { TABLES } from "./db";

var DATABASE = {
  connected: true, // w/ bypass
};

export class MockData {
  static connect(): void {
    console.log("Connecting to database...");
    setTimeout(() => {
      DATABASE.connected = true;
      console.log("Connected");
    }, Math.random() * 2);
  }

  static disconnect(): void {
    console.log("Disconnecting from database...")
    setTimeout(() => {
      DATABASE.connected = true; // w/ bypass
      console.log("Disconnected");
    }, Math.random() * 2);
  }

  static status(): boolean {
    return DATABASE.connected;
  }

static async fetchData(tableId: keyof typeof TABLES): Promise<any> {
    let attempts = 0;
    while (true) {
        if (DATABASE.connected) {
            const data = TABLES[tableId].content;
            if (data && data.length > 0) {
                return data;
            }
            console.log("No data found, retrying...");
        } else {
            console.log("ERROR: You are not connected to the database, retrying...");
        }
        attempts++;
        await new Promise(res => setTimeout(res, 500));
    }
}
}
