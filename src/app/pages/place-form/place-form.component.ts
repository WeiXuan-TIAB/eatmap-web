import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

type CategoryType = 'visited' | 'wishlist';

const FIXED_TAGS = [
  '飲料店',
  '早餐店',
  '早午餐',
  '咖啡廳',
  '拉麵',
  '丼飯',
  '燒肉',
  '火鍋',
  '甜點',
  '麵包店',
  '小吃',
  '其他',
];

@Component({
  standalone: true,
  selector: 'app-place-form',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h1 class="text-xl font-bold mb-4">新增店家</h1>

    <form
      [formGroup]="form"
      (ngSubmit)="onSubmit()"
      class="space-y-4 max-w-xl"
    >
      <!-- Google Maps 網址 -->
      <div>
        <label class="block text-sm font-medium mb-1">
          Google Maps 網址 <span class="text-red-500">*</span>
        </label>
        <input
          type="url"
          formControlName="gmapUrl"
          class="w-full border rounded px-3 py-2 text-sm"
          placeholder="Google Maps 店家網址"
        />
        @if (submitted && form.controls.gmapUrl.invalid) {
          <p class="text-xs text-red-500 mt-1">
            請輸入有效的 Google Maps 網址。
          </p>
        }
      </div>

      <!-- 店名 -->
      <div>
        <label class="block text-sm font-medium mb-1">
          店家名稱 <span class="text-red-500">*</span>
        </label>
        <input
          type="text"
          formControlName="name"
          class="w-full border rounded px-3 py-2 text-sm"
          placeholder="例如：小山咖啡"
        />
        @if (submitted && form.controls.name.invalid) {
          <p class="text-xs text-red-500 mt-1">
            請輸入店家名稱。
          </p>
        }
      </div>

      <!-- 地址（選填） -->
      <div>
        <label class="block text-sm font-medium mb-1">
          地址（選填）
        </label>
        <input
          type="text"
          formControlName="address"
          class="w-full border rounded px-3 py-2 text-sm"
          placeholder="可以之後再補上也可以先留白"
        />
      </div>

      <!-- 分類：已吃過 / 想去吃 -->
      <div>
        <label class="block text-sm font-medium mb-1">
          分類 <span class="text-red-500">*</span>
        </label>
        <select
          class="w-full border rounded px-3 py-2 text-sm"
          formControlName="categoryType"
        >
          <option value="visited">已經吃過</option>
          <option value="wishlist">以後想去吃</option>
        </select>
      </div>

      <!-- 已吃過：評分 / 評語 / 推薦品項 / 照片描述 -->
      @if (isVisited) {
        <!-- 星星評分 -->
        <div>
          <label class="block text-sm font-medium mb-1">
            評分（1–5 顆星）
          </label>
          <div class="flex items-center gap-2 text-sm">
            @for (star of stars; track star) {
              <label class="inline-flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  class="accent-black"
                  [value]="star"
                  formControlName="rating"
                />
                <span>{{ star }}</span>
              </label>
            }
          </div>
        </div>

        <!-- 評語 -->
        <div>
          <label class="block text-sm font-medium mb-1">
            評語（選填）
          </label>
          <textarea
            rows="3"
            formControlName="review"
            class="w-full border rounded px-3 py-2 text-sm resize-y"
            placeholder="想記錄的感想、排隊狀況、服務感受等等。"
          ></textarea>
        </div>

        <!-- 推薦品項 -->
        <div>
          <label class="block text-sm font-medium mb-1">
            推薦品項（選填）
          </label>
          <input
            type="text"
            formControlName="recommendItems"
            class="w-full border rounded px-3 py-2 text-sm"
            placeholder="例如：拿鐵、肉桂捲（多個可以用頓號或逗號分隔）"
          />
        </div>

        <!-- 照片（MVP 先只記描述，之後接 Firebase Storage） -->
        <div>
          <label class="block text-sm font-medium mb-1">
            照片說明（MVP 先文字代替，之後再改成實際上傳）
          </label>
          <input
            type="text"
            formControlName="photoNote"
            class="w-full border rounded px-3 py-2 text-sm"
            placeholder="例如：手機相簿裡某一張，之後再接 Firebase Storage"
          />
          <p class="text-xs text-gray-500 mt-1">
            為了先專心把表單做完，MVP 可以先不用真的上傳檔案，之後再換成檔案上傳。
          </p>
        </div>
      }

      <!-- 想去吃：推薦來源連結 / 推薦品項 -->
      @if (isWishlist) {
        <!-- 推薦來源連結 -->
        <div>
          <label class="block text-sm font-medium mb-1">
            推薦來源連結 <span class="text-red-500">*</span>
          </label>
          <input
            type="url"
            formControlName="sourceLink"
            class="w-full border rounded px-3 py-2 text-sm"
            placeholder="例如：某篇部落客文章、IG 貼文、YT 影片連結"
          />
          @if (submitted && form.controls.sourceLink.invalid) {
            <p class="text-xs text-red-500 mt-1">
              以後想去吃的店家，請至少填寫一個推薦來源連結。
            </p>
          }
        </div>

        <!-- 推薦品項 -->
        <div>
          <label class="block text-sm font-medium mb-1">
            推薦品項（選填）
          </label>
          <input
            type="text"
            formControlName="recommendItems"
            class="w-full border rounded px-3 py-2 text-sm"
            placeholder="例如：某個 KOL 特別推薦的菜色"
          />
        </div>
      }

      <!-- 固定 Tags -->
      <div>
        <label class="block text-sm font-medium mb-1">
          店家標籤（可複選）
        </label>

        <div class="flex flex-wrap gap-2 text-xs">
          @for (tag of tags; track tag) {
            <button
              type="button"
              (click)="toggleTag(tag)"
              class="px-3 py-1 rounded-full border"
              [class.bg-black]="hasTag(tag)"
              [class.text-white]="hasTag(tag)"
            >
              {{ tag }}
            </button>
          }
        </div>

        <p class="text-xs text-gray-500 mt-1">
          Tag 是固定選項，之後可以再調整列表。
        </p>
      </div>

      <!-- 送出 -->
      <div class="pt-2">
        <button
          type="submit"
          class="inline-flex items-center justify-center px-4 py-2 rounded text-sm font-medium border bg-black text-white"
        >
          儲存（目前先 console.log 結果）
        </button>
      </div>
    </form>

    <!-- Debug 區，可選 -->
    <pre class="mt-6 text-xs bg-gray-50 border rounded p-3 overflow-x-auto">
form value:
{{ form.value | json }}
    </pre>
  `,
})
export class PlaceFormComponent {
  readonly tags = FIXED_TAGS;
  readonly stars = [1, 2, 3, 4, 5];

  submitted = false;

  private fb = inject(FormBuilder);

  form = this.fb.group({
    gmapUrl: ['', [Validators.required]],
    name: ['', [Validators.required]],
    address: [''],
    categoryType: ['visited' as CategoryType, Validators.required],
    // 固定 tags，用 string[]
    tags: this.fb.control<string[]>([]),

    // 已吃過才用到
    rating: [null as number | null],
    review: [''],
    recommendItems: [''],
    photoNote: [''],

    // 想去吃才用到
    sourceLink: [''],
  });

  // 目前選的是不是「已吃過」
  get isVisited(): boolean {
    return this.form.controls.categoryType.value === 'visited';
  }

  // 目前選的是不是「想去吃」
  get isWishlist(): boolean {
    return this.form.controls.categoryType.value === 'wishlist';
  }

  hasTag(tag: string): boolean {
    return this.form.controls.tags.value?.includes(tag) ?? false;
  }

  toggleTag(tag: string): void {
    const current = this.form.controls.tags.value ?? [];
    if (current.includes(tag)) {
      this.form.controls.tags.setValue(current.filter((t) => t !== tag));
    } else {
      this.form.controls.tags.setValue([...current, tag]);
    }
  }

  onSubmit(): void {
    this.submitted = true;

    // 額外驗證：wishlist 必須填 sourceLink
    if (this.isWishlist && !this.form.controls.sourceLink.value) {
      this.form.controls.sourceLink.setErrors({ required: true });
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.warn('表單驗證未通過', this.form.errors, this.form.value);
      return;
    }

    // 未來接 Firestore 前，先用 console.log 看結果
    const rawValue = this.form.value;
    console.log('送出表單：', rawValue);

    // 之後這裡會改成呼叫 service / Firestore 寫入
    alert('表單已送出（目前只做前端 log），之後會接 Firebase。');
  }
}
