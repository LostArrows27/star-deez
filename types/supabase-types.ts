export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      category: {
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
        Relationships: [
          {
            foreignKeyName: "public_category_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          content: string
          created_at: string
          id: string
          is_edited: boolean
          modified_at: string | null
          reply_comment_id: string | null
          study_record_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_edited?: boolean
          modified_at?: string | null
          reply_comment_id?: string | null
          study_record_id?: string
          user_id?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_edited?: boolean
          modified_at?: string | null
          reply_comment_id?: string | null
          study_record_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_reply_comment_id_fkey"
            columns: ["reply_comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_study_record_id_fkey"
            columns: ["study_record_id"]
            isOneToOne: false
            referencedRelation: "study_records"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      document: {
        Row: {
          category_id: string
          cover: string | null
          created_at: string
          description: string
          id: string
          status: Database["public"]["Enums"]["document_status"]
          title: string
          unit_id: string
          user_id: string
        }
        Insert: {
          category_id: string
          cover?: string | null
          created_at?: string
          description: string
          id?: string
          status?: Database["public"]["Enums"]["document_status"]
          title: string
          unit_id: string
          user_id: string
        }
        Update: {
          category_id?: string
          cover?: string | null
          created_at?: string
          description?: string
          id?: string
          status?: Database["public"]["Enums"]["document_status"]
          title?: string
          unit_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_document_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_document_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "unit"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_document_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      follower: {
        Row: {
          created_at: string
          follower_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          follower_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          follower_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_follower_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_follower_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      likes: {
        Row: {
          comment_id: string | null
          created_at: string
          id: string
          study_record_id: string | null
          user_id: string
        }
        Insert: {
          comment_id?: string | null
          created_at?: string
          id?: string
          study_record_id?: string | null
          user_id?: string
        }
        Update: {
          comment_id?: string | null
          created_at?: string
          id?: string
          study_record_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_likes_study_record_id_fkey"
            columns: ["study_record_id"]
            isOneToOne: false
            referencedRelation: "study_records"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notification: {
        Row: {
          content: string
          created_at: string
          id: string
          is_readed: boolean
          is_seen: boolean
          link_to: string
          meta_data: Json | null
          receiver_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_readed?: boolean
          is_seen?: boolean
          link_to: string
          meta_data?: Json | null
          receiver_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_readed?: boolean
          is_seen?: boolean
          link_to?: string
          meta_data?: Json | null
          receiver_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          academics: Database["public"]["Enums"]["academic_status"] | null
          avatar: string
          bio: string | null
          country: string | null
          cover: string | null
          created_at: string
          dob: string
          email: string
          first_name: string
          full_name: string | null
          gender: Database["public"]["Enums"]["gender"]
          id: string
          job: string | null
          last_name: string
          school: string | null
        }
        Insert: {
          academics?: Database["public"]["Enums"]["academic_status"] | null
          avatar: string
          bio?: string | null
          country?: string | null
          cover?: string | null
          created_at?: string
          dob: string
          email: string
          first_name: string
          full_name?: string | null
          gender?: Database["public"]["Enums"]["gender"]
          id: string
          job?: string | null
          last_name: string
          school?: string | null
        }
        Update: {
          academics?: Database["public"]["Enums"]["academic_status"] | null
          avatar?: string
          bio?: string | null
          country?: string | null
          cover?: string | null
          created_at?: string
          dob?: string
          email?: string
          first_name?: string
          full_name?: string | null
          gender?: Database["public"]["Enums"]["gender"]
          id?: string
          job?: string | null
          last_name?: string
          school?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      search_history: {
        Row: {
          created_at: string
          search_word: string
          user_id: string
        }
        Insert: {
          created_at?: string
          search_word: string
          user_id: string
        }
        Update: {
          created_at?: string
          search_word?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_search_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      study_records: {
        Row: {
          begin_at: number
          class_id: string | null
          comment: string | null
          created_at: string
          document_id: string
          duration: number
          end_at: number
          id: string
          image: string | null
          time: string | null
          user_id: string
          visibility: string | null
        }
        Insert: {
          begin_at?: number
          class_id?: string | null
          comment?: string | null
          created_at?: string
          document_id: string
          duration: number
          end_at?: number
          id?: string
          image?: string | null
          time?: string | null
          user_id: string
          visibility?: string | null
        }
        Update: {
          begin_at?: number
          class_id?: string | null
          comment?: string | null
          created_at?: string
          document_id?: string
          duration?: number
          end_at?: number
          id?: string
          image?: string | null
          time?: string | null
          user_id?: string
          visibility?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_study_records_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "document"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_study_records_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      unit: {
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
        Relationships: [
          {
            foreignKeyName: "public_unit_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      search_profiles: {
        Args: {
          search_term: string
        }
        Returns: {
          academics: Database["public"]["Enums"]["academic_status"] | null
          avatar: string
          bio: string | null
          country: string | null
          cover: string | null
          created_at: string
          dob: string
          email: string
          first_name: string
          full_name: string | null
          gender: Database["public"]["Enums"]["gender"]
          id: string
          job: string | null
          last_name: string
          school: string | null
        }[]
      }
    }
    Enums: {
      academic_status:
        | "Pre-highschool"
        | "Highschool"
        | "Pre-university"
        | "University/college"
        | "Graduate/post-doc"
        | "I'm not a student"
      document_status: "learning" | "standby" | "finished"
      gender: "male" | "female" | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
