import { clusterApiUrl, Connection } from "@solana/web3.js";

export default class ConnectionFactory {
    private static conn: Connection;

    public static async create(): Promise<Connection> {
        if (!ConnectionFactory.conn) {
            ConnectionFactory.conn =
                await ConnectionFactory.createConnection();
        }

        return ConnectionFactory.conn;
    }

    private static async createConnection(): Promise<Connection> {
        return new Connection(
            clusterApiUrl('devnet'),
            'confirmed'
        );
    }
}
