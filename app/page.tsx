import { createClient } from '@/utils/supabase/server';

// 常に最新の3件を取得するための設定
export const revalidate = 0;

export default async function Page() {
  const supabase = createClient();

  // Supabaseからデータを取得
  const { data: quotes, error } = await supabase
    .from('quotes')
    .select('*');

  if (error || !quotes) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <p className="text-red-500 font-bold">データの取得に失敗しました。環境変数やテーブル名を確認してください。</p>
      </div>
    );
  }

  // ランダムに3件抽出
  const displayQuotes = [...quotes]
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-slate-50">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-slate-900">松陰の魂</h1>
          <p className="mt-2 text-slate-600">今のあなたへ、吉田松陰からの導き</p>
        </div>

        <div className="grid gap-6">
          {displayQuotes.map((quote) => (
            <div 
              key={quote.id} 
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200"
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
          {/* onClickを使わず、aタグで自分自身のURLに飛ばすことでリロードを実現 */}
          <a 
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            別の言葉を仰ぐ
          </a>
        </div>
      </div>
    </main>
  );
}