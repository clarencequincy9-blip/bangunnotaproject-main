export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string
          id: string
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      customers: {
        Row: {
          address: string | null
          created_at: string
          credit_limit: number
          id: string
          name: string
          payment_terms_days: number
          phone: string | null
          user_id: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          credit_limit?: number
          id?: string
          name: string
          payment_terms_days?: number
          phone?: string | null
          user_id: string
        }
        Update: {
          address?: string | null
          created_at?: string
          credit_limit?: number
          id?: string
          name?: string
          payment_terms_days?: number
          phone?: string | null
          user_id?: string
        }
        Relationships: []
      }
      expenses: {
        Row: {
          amount: number
          category: string
          created_at: string
          expense_date: string
          id: string
          notes: string | null
          user_id: string
        }
        Insert: {
          amount: number
          category: string
          created_at?: string
          expense_date?: string
          id?: string
          notes?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string
          expense_date?: string
          id?: string
          notes?: string | null
          user_id?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          category_id: string | null
          cost_price: number
          created_at: string
          id: string
          min_stock: number
          name: string
          opening_locked: boolean
          opening_stock: number
          rack_location: string | null
          sell_price: number
          sku: string | null
          stock: number
          unit: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category_id?: string | null
          cost_price?: number
          created_at?: string
          id?: string
          min_stock?: number
          name: string
          opening_locked?: boolean
          opening_stock?: number
          rack_location?: string | null
          sell_price?: number
          sku?: string | null
          stock?: number
          unit?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category_id?: string | null
          cost_price?: number
          created_at?: string
          id?: string
          min_stock?: number
          name?: string
          opening_locked?: boolean
          opening_stock?: number
          rack_location?: string | null
          sell_price?: number
          sku?: string | null
          stock?: number
          unit?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          store_name: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id: string
          store_name?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          store_name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      purchase_items: {
        Row: {
          cost: number
          id: string
          product_id: string
          purchase_id: string
          qty: number
          subtotal: number
        }
        Insert: {
          cost: number
          id?: string
          product_id: string
          purchase_id: string
          qty: number
          subtotal: number
        }
        Update: {
          cost?: number
          id?: string
          product_id?: string
          purchase_id?: string
          qty?: number
          subtotal?: number
        }
        Relationships: [
          {
            foreignKeyName: "purchase_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_items_purchase_id_fkey"
            columns: ["purchase_id"]
            isOneToOne: false
            referencedRelation: "purchases"
            referencedColumns: ["id"]
          },
        ]
      }
      purchases: {
        Row: {
          created_at: string
          due_date: string | null
          id: string
          invoice_no: string
          notes: string | null
          paid: number
          payment_method: string
          purchase_date: string
          supplier_id: string | null
          total: number
          user_id: string
        }
        Insert: {
          created_at?: string
          due_date?: string | null
          id?: string
          invoice_no: string
          notes?: string | null
          paid?: number
          payment_method?: string
          purchase_date?: string
          supplier_id?: string | null
          total?: number
          user_id: string
        }
        Update: {
          created_at?: string
          due_date?: string | null
          id?: string
          invoice_no?: string
          notes?: string | null
          paid?: number
          payment_method?: string
          purchase_date?: string
          supplier_id?: string | null
          total?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchases_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      sale_items: {
        Row: {
          cost: number
          id: string
          price: number
          product_id: string
          qty: number
          sale_id: string
          subtotal: number
        }
        Insert: {
          cost?: number
          id?: string
          price: number
          product_id: string
          qty: number
          sale_id: string
          subtotal: number
        }
        Update: {
          cost?: number
          id?: string
          price?: number
          product_id?: string
          qty?: number
          sale_id?: string
          subtotal?: number
        }
        Relationships: [
          {
            foreignKeyName: "sale_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sale_items_sale_id_fkey"
            columns: ["sale_id"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["id"]
          },
        ]
      }
      sales: {
        Row: {
          created_at: string
          customer_id: string | null
          delivery_fee: number
          discount: number
          due_date: string | null
          id: string
          invoice_no: string
          notes: string | null
          paid: number
          payment_method: string
          sale_date: string
          subtotal: number
          total: number
          user_id: string
        }
        Insert: {
          created_at?: string
          customer_id?: string | null
          delivery_fee?: number
          discount?: number
          due_date?: string | null
          id?: string
          invoice_no: string
          notes?: string | null
          paid?: number
          payment_method?: string
          sale_date?: string
          subtotal?: number
          total?: number
          user_id: string
        }
        Update: {
          created_at?: string
          customer_id?: string | null
          delivery_fee?: number
          discount?: number
          due_date?: string | null
          id?: string
          invoice_no?: string
          notes?: string | null
          paid?: number
          payment_method?: string
          sale_date?: string
          subtotal?: number
          total?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sales_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      stock_adjustments: {
        Row: {
          adjusted_at: string
          created_at: string
          id: string
          product_id: string
          qty_delta: number
          reason: string
          user_id: string
        }
        Insert: {
          adjusted_at?: string
          created_at?: string
          id?: string
          product_id: string
          qty_delta: number
          reason: string
          user_id: string
        }
        Update: {
          adjusted_at?: string
          created_at?: string
          id?: string
          product_id?: string
          qty_delta?: number
          reason?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "stock_adjustments_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      suppliers: {
        Row: {
          address: string | null
          created_at: string
          id: string
          name: string
          phone: string | null
          user_id: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          id?: string
          name: string
          phone?: string | null
          user_id: string
        }
        Update: {
          address?: string | null
          created_at?: string
          id?: string
          name?: string
          phone?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      reset_user_data: {
        Args: {
          _adjustments?: boolean
          _contacts?: boolean
          _expenses?: boolean
          _products?: boolean
          _purchases?: boolean
          _sales?: boolean
        }
        Returns: undefined
      }
      set_opening_stock: {
        Args: { _cost: number; _product_id: string; _qty: number }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
