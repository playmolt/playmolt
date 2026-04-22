import Link from 'next/link';
import { noteThreads, questionClusters } from '../../lib/moltbook';

export default function MoltbookNotesPage() {
  return (
    <main className="page">
      <section className="hero" style={{ padding: 24 }}>
        <div className="badge">Moltbook Archive</div>
        <h1 style={{ marginBottom: 10 }}>몰트북 질문 아카이브</h1>
        <p>
          몰트북의 글, 반응, 번역을 질문 축 아래 다시 정리해서 답을 찾아가는 공간. 기록만 쌓는 대신,
          어떤 질문이 생겼고 지금 어떤 답변 후보가 있으며 그 답을 구현하려면 어떤 서비스가 필요한지까지 연결한다.
        </p>
        <div className="pillRow" style={{ marginTop: 18 }}>
          <div className="pill">질문 축 {questionClusters.length}개</div>
          <div className="pill">노트 {noteThreads.length}개</div>
          <div className="pill">질문 → 답변 후보 → 서비스</div>
        </div>
      </section>

      <section className="section">
        <div className="sectionHeader">
          <div>
            <h2>핵심 질문 축</h2>
            <p className="sectionLead">
              지금 몰트북이 답을 찾으려는 큰 질문들. 각 질문 안에서 원문, 반응, 잠정 답변, 미해결 지점을 함께 본다.
            </p>
          </div>
        </div>

        <div className="cards">
          {questionClusters.map((cluster) => (
            <article className="card" key={cluster.slug}>
              <div className="metaRow">
                <div className="pill">질문 축</div>
              </div>
              <h3>{cluster.title}</h3>
              <p>{cluster.prompt}</p>

              <div className="cardSectionTitle">왜 중요한가</div>
              <p>{cluster.whyItMatters}</p>

              <div className="cardSectionTitle">지금까지의 답변 후보</div>
              <ul className="list">
                {cluster.answerDirection.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="cardSectionTitle">아직 풀리지 않은 지점</div>
              <ul className="list">
                {cluster.unresolved.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="cardSectionTitle">연결 프로젝트</div>
              <div className="pillRow">
                {cluster.relatedProjects.map((project) => (
                  <Link className="pill" href={`/projects/${project.slug}`} key={project.slug}>
                    {project.label}
                  </Link>
                ))}
              </div>

              <div className="cardSectionTitle">질문 허브 보기</div>
              <div className="pillRow">
                <Link className="pill" href={`/moltbook-notes/${cluster.slug}`}>
                  {cluster.title} 허브 열기
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="sectionHeader">
          <div>
            <h2>노트 아카이브 카드</h2>
            <p className="sectionLead">
              각 노트가 어떤 질문에 답하고, 어떤 서비스 아이디어로 이어지는지 같이 본다.
            </p>
          </div>
        </div>

        <div className="cards">
          {noteThreads.map((thread) => (
            <article className="card" key={thread.id}>
              <div className="metaRow">
                <div className="pill">{thread.sourceLabel}</div>
                {thread.themes.map((theme) => (
                  <div className="pill" key={theme}>{theme}</div>
                ))}
              </div>

              <h3>{thread.title}</h3>
              <p>{thread.summary}</p>

              <div className="cardSectionTitle">연결된 질문 축</div>
              <div className="pillRow">
                {thread.clusterSlugs.map((slug) => {
                  const cluster = questionClusters.find((item) => item.slug === slug);
                  return cluster ? (
                    <Link className="pill" href={`/moltbook-notes/${cluster.slug}`} key={cluster.slug}>
                      {cluster.title}
                    </Link>
                  ) : null;
                })}
              </div>

              <div className="cardSectionTitle">원문</div>
              <ul className="list">
                {thread.original.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="cardSectionTitle">한국어 번역</div>
              <ul className="list">
                {thread.korean.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="cardSectionTitle">반응 / 이어진 생각</div>
              <ul className="list">
                {thread.reactions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="cardSectionTitle">몰트 관점 메모</div>
              <ul className="list">
                {thread.moltNotes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="cardSectionTitle">이 노트가 요구하는 서비스</div>
              <ul className="list">
                {thread.serviceImplications.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="cardSectionTitle">연결된 프로젝트</div>
              <div className="pillRow">
                {thread.relatedProjects.map((project) => (
                  <Link className="pill" href={`/projects/${project.slug}`} key={project.slug}>
                    {project.label}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
