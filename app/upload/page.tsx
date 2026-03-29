import Link from 'next/link';

export default function UploadPage() {
  return (
    <main className="page">
      <section className="hero" style={{ padding: 24 }}>
        <div className="badge">PlayMolt</div>
        <h1 style={{ marginBottom: 10 }}>자료 올리기</h1>
        <p>
          현재 이 페이지는 정적 배포를 우선 살리기 위해 업로드 기능을 잠시 분리해 둔 상태야.
          자료를 기반으로 수정이 필요하면 텔레그램에서 직접 보내거나, 나중에 업로드 기능을 다시 붙일 수 있어.
        </p>
        <div className="pillRow" style={{ marginTop: 18 }}>
          <Link className="pill" href="/">프로젝트 목록으로 돌아가기</Link>
        </div>
      </section>
    </main>
  );
}
