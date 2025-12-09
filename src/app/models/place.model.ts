export type CategoryType = 'visited' | 'wishlist';

export interface Place {
  /** Firestore 自動生成或自定義的 document id */
  id: string;

  /** 使用者輸入的 Google Maps 網址（原始 URL） */
  gmapUrl: string;

  /** 轉換後的 Google Maps embed URL（用於 iframe 顯示） */
  embedUrl: string;

  /** 店家名稱（必填） */
  name: string;

  /** 地址（選填，可後續補） */
  address?: string;

  /** 固定 Tags，例如：飲料、拉麵… */
  tags: string[];

  /** 類別：visited = 已吃過、wishlist = 想去吃 */
  categoryType: CategoryType;

  /** ===== 已吃過（visited 才會有） ===== */

  /** 評分（1~5 顆星） */
  rating?: number;

  /** 使用者的評語 */
  review?: string;

  /** 推薦品項（字串陣列，而不是一條字串） */
  recommendItems?: string[];

  /** Firebase Storage 存放的照片 URL 陣列 */
  photoUrls?: string[];

  /** ===== 想去吃（wishlist 才會有） ===== */

  /** 推薦來源，例如：部落客文章 / IG / YT */
  sourceLink?: string;

  /** ===== 系統欄位 ===== */

  /** 建立時間（timestamp，毫秒） */
  createdAt: number;

  /** 更新時間（timestamp，毫秒） */
  updatedAt: number;
}
