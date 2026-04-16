import { createClient } from '@/utils/supabase/server';

// 【重要】キャッシュを無効化し、アクセスのたびにサーバー側で実行する設定
export const revalidate = 0;

export default async function Page() {
  const supabase = createClient();

  // 1. Supabaseから全データを取得
  const { data: quotes, error } = await supabase
    .from('quotes')
    .select('*');

  if (error || !quotes) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">データの読み込みに失敗しました。</p>
      </div>
    );
  }

  // 2. JavaScript側でシャッフルして3件抽出
  // sort(() => Math.random() - 0.5) で配列をランダムに並び替えます
  const displayQuotes = quotes
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-slate-50">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            松陰の魂 
          </h1>
          <p className="mt-2 text-slate-600">今のあなたへ、吉田松陰からの導き</p>
        </div>

        <div className="grid gap-6">
          {displayQuotes.map((quote) => (
            <div 
              key={quote.id} 
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 transition-hover hover:shadow-md"
            >
              <p className="text-xl leading-relaxed text-slate-800 font-medium mb-4">
                「{quote.content}」
              </p>
              <p className="text-right text-slate-500 font-bold">
                — {quote.author}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          {/* ブラウザの機能でリロードするボタン */}
          <button 
            onClick="window.location.reload()" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            別の言葉を仰ぐ
          </button>
        </div>
      </div>
    </main>
  );
}