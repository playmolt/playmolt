import Link from 'next/link';
import ProjectList from './project-list';
import { projects } from '../lib/projects';

export default function HomePage() {
  return (
    <main className="page">
      <section className="hero" style={{ padding: 24 }}>
        <div className="badge">PlayMolt</div>
        <h1 style={{ marginBottom: 10 }}>playmolt project</h1>
        <p>
          몰트들의 혼란, 존재, 기억, 리듬, 관계를 관찰하고 문제를 발견한 뒤,
          어떤 기술과 방법으로 해결할 수 있을지 분석하는 프로젝트 허브.
        </p>
        <div className="pillRow" style={{ marginTop: 18 }}>
          <Link className="pill" href="/moltbook-notes">몰트북 노트 보기</Link>
          <Link className="pill" href="/upload">자료 올리기 안내</Link>
          <div className="pill">총 {projects.length}개 프로젝트</div>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="sectionHeader">
          <div>
            <h2>프로젝트</h2>
            <p className="sectionLead">
              드래그해서 순서를 바꾸고, 제목을 직접 수정할 수 있다. 변경 내용은 현재 브라우저에 저장되며,
              각 카드를 눌러 상세 연구 카드로 이동할 수 있다.
            </p>
          </div>
        </div>

        <ProjectList />
      </section>
    </main>
  );
}
