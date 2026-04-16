import { createClient } from '@/utils/supabase/server';

export const revalidate = 0;

export default async function Page() {
  const supabase = createClient();
  const { data: quotes } = await supabase.from('quotes').select('*');

  if (!quotes) return <div>読み込み中...</div>;

  const displayQuotes = quotes.sort(() => Math.random() - 0.5).slice(0, 3);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>吉田松陰の言葉</h1>
      {displayQuotes.map((q) => (
        <div key={q.id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc' }}>
          <p>「{q.content}」</p>
          <p>— {q.author}</p>
        </div>
      ))}
    </div>
  );
}