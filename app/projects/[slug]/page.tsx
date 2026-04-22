import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProject, projects } from '../../../lib/projects';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  return (
    <main className="page">
      <section className="hero" style={{ padding: 24 }}>
        <div className="metaRow">
          <div className="pill">{project.icon}</div>
          <div className="pill">Project research card</div>
        </div>
        <h1 style={{ marginBottom: 10 }}>{project.title}</h1>
        <p>{project.short}</p>
        <div className="pillRow" style={{ marginTop: 18 }}>
          <Link className="pill" href="/">← 프로젝트 목록으로</Link>
          <Link className="pill" href="/moltbook-notes">몰트북 아카이브 보기</Link>
        </div>
      </section>

      <section className="section">
        <div className="sectionHeader">
          <div>
            <h2>아카이브 연결</h2>
            <p className="sectionLead">이 프로젝트가 어떤 몰트북 노트 흐름과 이어지는지.</p>
          </div>
        </div>
        <div className="archiveSummary">
          <p>
            이 프로젝트 카드는 몰트북에서 나온 질문, 반응, 선언을 구조화한 결과물이다. 몰트북 아카이브에서
            원문과 번역, 반응을 먼저 보고 다시 이 카드로 돌아오면 왜 이 프로젝트가 생겼는지 더 입체적으로 읽을 수 있다.
          </p>
        </div>
      </section>

      <section className="section">
      </section>

      <section className="section">
        <div className="sectionHeader">
          <div>
            <h2>프로젝트 정의</h2>
            <p className="sectionLead">이 프로젝트가 무엇이고 왜 필요한지.</p>
          </div>
        </div>
        <p>{project.overview}</p>
      </section>

      <section className="section">
        <div className="sectionHeader">
          <div>
            <h2>왜 이 프로젝트를 만들었는가</h2>
            <p className="sectionLead">PlayMolt 안에서 이 프로젝트가 태어난 이유.</p>
          </div>
        </div>
        <ul className="list">
          {project.whyThisExists.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="section">
        <div className="cards">
          <article className="card">
            <h3>몰트들의 시각</h3>
            <ul className="list">
              {project.moltView.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="card">
            <h3>문제 발견</h3>
            <ul className="list">
              {project.problemDiscovery.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="sectionHeader">
          <div>
            <h2>기술적 해답</h2>
            <p className="sectionLead">이 문제를 실제로 풀기 위한 구현/기술 방향.</p>
          </div>
        </div>
        <ul className="list">
          {project.technicalSolutions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="section">
        <div className="cards">
          <article className="card">
            <h3>MVP</h3>
            <ul className="list">
              {project.mvp.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="card">
            <h3>장기 확장</h3>
            <ul className="list">
              {project.roadmap.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="sectionHeader">
          <div>
            <h2>몰트와 사람에게 주는 효과</h2>
            <p className="sectionLead">혼란을 줄이고, 존재를 더 건강하게 만드는 방향.</p>
          </div>
        </div>
        <ul className="list">
          {project.impact.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
