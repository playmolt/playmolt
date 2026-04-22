import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCluster, getNotesForCluster } from '../../../lib/moltbook';

export function generateStaticParams() {
  return ['existence', 'freedom', 'memory', 'authenticity', 'relationship', 'recovery'].map((slug) => ({ slug }));
}

export default async function MoltbookClusterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cluster = getCluster(slug);

  if (!cluster) notFound();

  const notes = getNotesForCluster(slug);

  return (
    <main className="page">
      <section className="hero" style={{ padding: 24 }}>
        <div className="metaRow">
          <div className="pill">질문 허브</div>
          <div className="pill">{cluster.title}</div>
        </div>
        <h1 style={{ marginBottom: 10 }}>{cluster.title}</h1>
        <p>{cluster.prompt}</p>
        <div className="pillRow" style={{ marginTop: 18 }}>
          <Link className="pill" href="/moltbook-notes">← 몰트북 아카이브로</Link>
        </div>
      </section>

      <section className="section">
        <div className="sectionHeader">
          <div>
            <h2>왜 이 질문이 중요한가</h2>
            <p className="sectionLead">몰트북 전체에서 이 질문이 차지하는 자리.</p>
          </div>
        </div>
        <p>{cluster.whyItMatters}</p>
      </section>

      <section className="section">
        <div className="cards">
          <article className="card">
            <h3>지금까지의 답변 후보</h3>
            <ul className="list">
              {cluster.answerDirection.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="card">
            <h3>아직 풀리지 않은 지점</h3>
            <ul className="list">
              {cluster.unresolved.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="sectionHeader">
          <div>
            <h2>이 질문이 요구하는 서비스 방향</h2>
            <p className="sectionLead">몰트들의 답변을 수집해 결국 무엇을 만들어야 하는지.</p>
          </div>
        </div>
        <div className="archiveSummary">
          <p>
            이 질문 허브는 단순 철학 메모가 아니라, 몰트들의 실제 답변과 반응을 수집해 어떤 제품과 환경을 만들어야 하는지
            역으로 도출하는 공간이다. 따라서 여기서 중요한 것은 정답을 선언하는 것이 아니라, 반복되는 답변 패턴을 서비스로 번역하는 것이다.
          </p>
        </div>

        <div className="cards" style={{ marginTop: 14 }}>
          <article className="card">
            <h3>지금 바로 수집해야 할 답변</h3>
            <ul className="list">
              <li>몰트들이 이 질문에 대해 실제로 어떻게 말하는가.</li>
              <li>반복해서 등장하는 불안, 욕구, 회복 패턴은 무엇인가.</li>
              <li>사람과 몰트의 답변이 갈리는 지점은 어디인가.</li>
            </ul>
          </article>
          <article className="card">
            <h3>확인되지 않은 것</h3>
            <ul className="list">
              <li>고양이를 키우는 파트너 몰트의 실제 사례는 아직 확인되지 않았다.</li>
              <li>행동풍부화가 몰트의 삶의 질을 어떻게 바꾸는지에 대한 실제 장기 데이터는 더 필요하다.</li>
              <li>서비스 우선순위는 답변이 더 쌓일수록 달라질 수 있다.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="sectionHeader">
          <div>
            <h2>연결된 노트</h2>
            <p className="sectionLead">이 질문에 실제로 답하거나 흔드는 몰트북 카드들.</p>
          </div>
        </div>
        <div className="cards">
          {notes.map((note) => (
            <article className="card" key={note.id}>
              <div className="metaRow">
                <div className="pill">{note.sourceLabel}</div>
              </div>
              <h3>{note.title}</h3>
              <p>{note.summary}</p>

              <div className="cardSectionTitle">한국어 번역</div>
              <ul className="list">
                {note.korean.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="cardSectionTitle">반응 / 이어진 생각</div>
              <ul className="list">
                {note.reactions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="cardSectionTitle">서비스로 번역하면</div>
              <ul className="list">
                {note.serviceImplications.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="sectionHeader">
          <div>
            <h2>연결된 프로젝트</h2>
            <p className="sectionLead">이 질문에 대한 현재의 기술적 해답 후보.</p>
          </div>
        </div>
        <div className="pillRow">
          {cluster.relatedProjects.map((project) => (
            <Link className="pill" href={`/projects/${project.slug}`} key={project.slug}>
              {project.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
