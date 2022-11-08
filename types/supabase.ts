export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      GameSeriesTable: {
        Row: {
          id: string;
          created_at: string | null;
          gameSeriesName: string | null;
          isTournament: boolean | null;
        };
        Insert: {
          id?: string;
          created_at?: string | null;
          gameSeriesName?: string | null;
          isTournament?: boolean | null;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          gameSeriesName?: string | null;
          isTournament?: boolean | null;
        };
      };
      GameTable: {
        Row: {
          id: string;
          created_at: string | null;
          player1Score: number | null;
          player2Score: number | null;
          player1CardinalSide: string | null;
          player1: string | null;
          player2: string | null;
          gameSeries: string | null;
        };
        Insert: {
          id: string;
          created_at?: string | null;
          player1Score?: number | null;
          player2Score?: number | null;
          player1CardinalSide?: string | null;
          player1?: string | null;
          player2?: string | null;
          gameSeries?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          player1Score?: number | null;
          player2Score?: number | null;
          player1CardinalSide?: string | null;
          player1?: string | null;
          player2?: string | null;
          gameSeries?: string | null;
        };
      };
      PlayerTable: {
        Row: {
          id: string;
          created_at: string | null;
          playerName: string | null;
          playerEmail: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string | null;
          playerName?: string | null;
          playerEmail?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          playerName?: string | null;
          playerEmail?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
