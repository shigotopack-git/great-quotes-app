import { createClient } from '@/utils/supabase/server';

export default async function Index() {
  const supabase = await createClient();

  // Supabaseの 'quotes' テーブルからデータを取得
  const { data: quotes, error } = await supabase
    .from('quotes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching quotes:', error);
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
          心に響く偉人の名言
        </h1>

        <div className="grid gap-6">
          {quotes && quotes.length > 0 ? (
            quotes.map((quote) => (
              <div 
                key={quote.id} 
                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <p className="text-xl text-gray-700 italic mb-4">
                  「{quote.content}」
                </p>
                <p className="text-right text-gray-500 font-medium">
                  — {quote.author}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center p-12 bg-white rounded-xl shadow-sm">
              <p className="text-gray-500">まだ名言が登録されていません。</p>
              <p className="text-sm text-gray-400 mt-2">Supabaseのテーブルにデータを追加してみてください！</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}