export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          display_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          display_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          display_name?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          title: string
          category: string
          entitlement_type: string
          amount_minor: number
          currency: string
          billing_type: string
          duration_days: number | null
          active: boolean
          metadata: Json
          created_at: string
        }
      }
      purchases: {
        Row: {
          id: string
          user_id: string | null
          product_id: string | null
          purchase_type: string
          amount_minor: number
          currency: string
          status: string
          stripe_session_id: string | null
          stripe_payment_intent_id: string | null
          quiz_id: string | null
          metadata: Json
          created_at: string
          completed_at: string | null
        }
      }
      entitlements: {
        Row: {
          id: string
          user_id: string
          product_id: string
          entitlement_type: string
          pack_id: string | null
          expires_at: string | null
          source_purchase_id: string | null
          created_at: string
        }
      }
      report_access_tokens: {
        Row: {
          id: string
          user_id: string
          quiz_id: string
          token_hash: string
          purchase_id: string | null
          expires_at: string | null
          created_at: string
        }
      }
      donations: {
        Row: {
          id: string
          user_id: string | null
          purchase_id: string | null
          amount_minor: number
          currency: string
          reference: string | null
          created_at: string
        }
      }
      contact_messages: {
        Row: {
          id: string
          user_id: string | null
          name: string | null
          email: string
          subject: string | null
          message: string
          created_at: string
        }
        Insert: {
          user_id?: string | null
          name?: string | null
          email: string
          subject?: string | null
          message: string
        }
      }
      privacy_requests: {
        Row: {
          id: string
          user_id: string | null
          email: string
          request_type: string
          details: string | null
          status: string
          created_at: string
        }
        Insert: {
          user_id?: string | null
          email: string
          request_type: string
          details?: string | null
          status?: string
        }
      }
      sound_mixes: {
        Row: {
          id: string
          user_id: string
          name: string
          layers: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          name: string
          layers?: Json
        }
        Update: {
          name?: string
          layers?: Json
          updated_at?: string
        }
      }
      content_packs: {
        Row: {
          id: string
          kind: string
          title: string
          description: string | null
          product_id: string | null
          amount_minor: number
          storage_prefix: string | null
          item_ids: string[]
          active: boolean
          created_at: string
        }
      }
    }
  }
}

export type EntitlementRow = Database['public']['Tables']['entitlements']['Row']
export type PurchaseRow = Database['public']['Tables']['purchases']['Row']
export type ContentPackRow = Database['public']['Tables']['content_packs']['Row']
