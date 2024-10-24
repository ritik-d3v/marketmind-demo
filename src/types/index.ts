export interface Message {
  role: string;
  content: string;
}

export interface ApiResponse {
  id: string;
  question: string;
  response: string;
  source_documents: Array<{
    page_content: string;
    metadata: {
      id: string;
      // company_name: string;
      // logo_url: string;
      // color_theme: string;
      pdf_file_name: string;
      metadata: {
        source: string;
        page: number;
      };
    };
  }>;
}

export interface ApiRequestData {
  model: string;
  variation: string;
  messages: Message[];
  temperature: number;
  collection_name: string;
  company_name: string;
  get_signed_urls: boolean;
  template: string;
}
