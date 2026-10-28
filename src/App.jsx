import { useEffect, useSyncExternalStore } from 'react'
import './App.css'

function subscribeToNavigation(onChange) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

function getCurrentLocation() {
  return window.location.hash
}

const projects = [
  {
    number: '01', category: 'WEB · 웹사이트', title: '나를 소개하는 첫 번째 공간', description: '내 이야기와 관심사를 담아 만든 웹사이트', style: 'website',
    overview: '자기소개와 프로젝트를 한곳에서 볼 수 있는 개인 포트폴리오 웹사이트입니다. 나를 처음 만나는 사람도 관심사와 작업을 쉽게 이해할 수 있는 공간을 생각했습니다.',
    goal: '흩어져 있는 작업과 경험을 모아 나만의 이야기로 보여 주는 것이 목표입니다. 소개에서 프로젝트 목록, 상세 내용까지 자연스럽게 이어지는 흐름을 만듭니다.',
    process: ['소개하고 싶은 나의 관심사와 프로젝트를 정리합니다.', '홈, 자기소개, 포트폴리오 목록과 상세 화면을 구성합니다.', '화면 크기를 바꿔 가며 글자가 잘 읽히고 메뉴가 동작하는지 확인합니다.'],
    learning: 'React로 화면을 나누는 방법과 내용에 맞는 디자인을 고민해 볼 수 있습니다. 직접 작업한 뒤에는 어려웠던 점과 해결 방법을 이곳에 자신의 말로 적어 보세요.',
  },
  {
    number: '02', category: 'IDEA · 아이디어', title: '일상의 작은 불편함 해결하기', description: '주변의 문제를 발견하고 해결 방법을 고민한 기록', style: 'idea',
    overview: '학교나 일상에서 겪는 작은 불편함을 발견하고, 해결 아이디어를 구체적인 화면으로 옮겨 보는 프로젝트입니다. 자주 반복되는 문제 한 가지에서 출발합니다.',
    goal: '누가 어떤 상황에서 불편을 느끼는지 이해하고, 꼭 필요한 기능으로 해결 방법을 제안합니다. 기능의 수보다 문제를 얼마나 잘 해결하는지에 집중합니다.',
    process: ['불편했던 상황과 그 상황을 겪는 사람을 구체적으로 적습니다.', '가능한 해결 방법을 비교하고 핵심 기능 한 가지를 선택합니다.', '간단한 시제품을 만들어 직접 사용해 보고 개선할 점을 정리합니다.'],
    learning: '문제를 구체적으로 정의하고 피드백을 바탕으로 개선하는 과정을 연습합니다. 실제로 시도한 방법과 처음 생각에서 달라진 점을 기록해 보세요.',
  },
  {
    number: '03', category: 'CREATIVE · 자유 프로젝트', title: '좋아하는 것에서 시작한 작업', description: '호기심을 따라 시도하고 새롭게 만들어 본 결과물', style: 'creative',
    overview: '좋아하는 음악, 그림, 게임 등 나만의 관심사를 새로운 결과물로 표현하는 자유 프로젝트입니다. 작은 아이디어라도 직접 만들어 보는 데 의미를 둡니다.',
    goal: '좋아하는 것의 어떤 부분을 표현하고 싶은지 정하고, 자신만의 시각을 담은 결과물을 완성합니다. 웹페이지나 작은 도구 등 알맞은 형태를 자유롭게 선택합니다.',
    process: ['관심 있는 주제와 떠오르는 아이디어를 모읍니다.', '표현할 분위기와 형태를 정하고 작은 부분부터 만듭니다.', '완성한 결과를 돌아보며 다음에 더 시도하고 싶은 것을 정리합니다.'],
    learning: '아이디어를 구체화하고 여러 방법을 시도하며 나만의 표현 방식을 찾아봅니다. 작업하면서 새롭게 알게 된 점과 가장 마음에 드는 부분을 소개해 보세요.',
  },
]

function ProjectArtwork({ project, className = '' }) {
  return (
    <div className={`project-art ${project.style} ${className}`} aria-hidden="true">
      <span className="project-number">{project.number}</span>
      {project.style === 'website' && <div className="mini-browser"><div className="mini-toolbar"><i /><i /><i /></div><div className="mini-layout"><span>HELLO!</span><div /><p>My little corner<br />of the internet.</p></div></div>}
      {project.style === 'idea' && <><div className="idea-circle" /><span className="idea-asterisk">✳</span><span className="idea-caption">WHAT IF?</span></>}
      {project.style === 'creative' && <><div className="creative-shape shape-one" /><div className="creative-shape shape-two" /><span className="creative-caption">make<br /><em>something.</em></span></>}
    </div>
  )
}

function App() {
  const currentLocation = useSyncExternalStore(subscribeToNavigation, getCurrentLocation)
  const isPortfolioPage = currentLocation === '#/portfolio'
  const isAboutPage = currentLocation === '#/about' || currentLocation === '#about'
  const isProjectPage = currentLocation.startsWith('#/portfolio/')
  const selectedProject = isProjectPage ? projects.find((project) => currentLocation === `#/portfolio/${project.style}`) : undefined

  useEffect(() => {
    document.title = isProjectPage ? `${selectedProject?.title ?? '프로젝트를 찾을 수 없어요'} | 나의 포트폴리오` : isPortfolioPage ? '포트폴리오 목록 | 나의 포트폴리오' : isAboutPage ? '자기소개 | 나의 포트폴리오' : '나의 포트폴리오'

    if (isPortfolioPage || isProjectPage) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      document.getElementById(isProjectPage ? 'project-title' : 'portfolio-title')?.focus({ preventScroll: true })
    } else {
      const targetId = isAboutPage ? 'about' : currentLocation.slice(1) || 'home'
      document.getElementById(targetId)?.scrollIntoView({ block: 'start' })
      if (isAboutPage) document.getElementById('about-title')?.focus({ preventScroll: true })
    }
  }, [currentLocation, isPortfolioPage, isAboutPage, isProjectPage, selectedProject])

  return (
    <>
      <a className="skip-link" href="#main" onClick={(event) => { event.preventDefault(); document.getElementById('main')?.focus(); document.getElementById('main')?.scrollIntoView({ block: 'start' }) }}>본문으로 바로가기</a>
      <header className="site-header">
        <div className="header-inner">
          <a className="wordmark" href="#home" aria-label="나의 포트폴리오 홈">
            <span className="brand-symbol" aria-hidden="true">✳</span> my portfolio<span className="brand-dot">.</span>
          </a>
          <nav aria-label="주요 메뉴">
            <a href="#about" aria-current={isAboutPage ? 'location' : undefined}>자기소개</a>
            <a href="#/portfolio" aria-current={isPortfolioPage || isProjectPage ? 'page' : undefined}>포트폴리오 <span aria-hidden="true">↗</span></a>
          </nav>
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        {!isPortfolioPage && !isProjectPage && <>
        <section className="hero page-width" id="home" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> 안녕하세요, 저는 찬솔입니다</p>
            <h1 id="hero-title">농구와 유도를 좋아하고<br /><span className="underlined">꾸준히 도전하는 찬솔</span></h1>
            <p className="hero-description">제가 좋아하는 것과 잘하는 점,<br />앞으로 이루고 싶은 목표를 소개합니다.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#about">소개 더 보기 <span aria-hidden="true">↓</span></a>
              <a className="text-link" href="#/portfolio">작품 둘러보기 <span aria-hidden="true">→</span></a>
            </div>
            <p className="hero-note"><span aria-hidden="true">✳</span> 꾸준히 노력하며 한 걸음씩 나아가요.</p>
          </div>
          <div className="profile-visual" aria-hidden="true">
            <div className="profile-visual-ring" />
            <div className="profile-visual-card">
              <span className="profile-visual-label">나를 소개해요</span>
              <span className="profile-visual-name">찬솔</span>
              <span className="profile-visual-line" />
              <span className="profile-visual-caption">농구 · 유도 · 꾸준함</span>
            </div>
            <span className="profile-visual-mark">柔</span>
          </div>
        </section>
        <section className="profile-section page-width" id="about" aria-labelledby="about-title">
          <div className="profile-section-heading">
            <p className="eyebrow">01 / 찬솔 소개</p>
            <h2 id="about-title" tabIndex={-1}>찬솔을 소개합니다<span>.</span></h2>
            <p>좋아하는 것부터 앞으로의 목표까지, 저에 대해 소개할게요.</p>
          </div>
          <div className="profile-card-grid">
            <article className="profile-info-card profile-interests" id="interests">
              <span className="profile-card-number">01</span>
              <p className="eyebrow">관심사</p>
              <h3>좋아하는 것</h3>
              <div className="profile-tags"><span>농구</span><span>유도</span></div>
            </article>
            <article className="profile-info-card profile-learning" id="strengths">
              <span className="profile-card-number">02</span>
              <p className="eyebrow">강점과 배움</p>
              <h3>꾸준히, 하나씩</h3>
              <p>꾸준히 하는 것이 제가 잘하는 점이에요. 유도 기술을 더 배우고 싶어요.</p>
            </article>
            <article className="profile-info-card profile-activities" id="activities">
              <span className="profile-card-number">03</span>
              <p className="eyebrow">활동과 작품</p>
              <h3>활동과 작품</h3>
              <p>소개할 활동이나 작품을 나중에 이곳에 추가할게요.</p>
              <div className="activity-placeholder" aria-label="나중에 사진이나 작품을 추가할 수 있는 공간">사진이나 작품을<br />나중에 추가해요</div>
            </article>
            <article className="profile-info-card profile-goal" id="goals">
              <span className="profile-card-number">04</span>
              <p className="eyebrow">목표</p>
              <h3>앞으로의 목표</h3>
              <p className="goal-text">금메달 따기<span aria-hidden="true">!</span></p>
            </article>
          </div>
        </section>
        <section className="work-invitation">
          <div className="page-width work-invitation-inner">
            <div><p className="eyebrow">포트폴리오</p><h2>작품도 함께 볼까요<span>?</span></h2><p className="invitation-description">프로젝트 모음은 준비되면 하나씩 소개할게요.</p></div>
            <a className="button button-primary" href="#/portfolio">포트폴리오 보기 <span aria-hidden="true">↗</span></a>
          </div>
        </section>
        </>}
        {isPortfolioPage && <section className="portfolio-section portfolio-page" aria-labelledby="portfolio-title">
          <div className="page-width">
            <a className="text-link list-back" href="#home"><span aria-hidden="true">←</span> 홈으로 돌아가기</a>
            <div className="portfolio-heading"><div><p className="eyebrow">MY PORTFOLIO / SELECTED WORK</p><h1 id="portfolio-title" tabIndex={-1}>포트폴리오<span>.</span></h1><p className="list-description">작은 호기심에서 시작한 작업들을 모았습니다.</p></div><p>프로젝트 예시입니다.<br />직접 만든 작업으로 채워 보세요.</p></div>
            <div className="list-summary"><span>전체 프로젝트</span><span>{projects.length.toString().padStart(2, '0')}</span></div>
            <div className="project-grid">
              {projects.map((project) => (
                <article className="project-card" key={project.number}>
                  <a className="project-card-link" href={`#/portfolio/${project.style}`} aria-label={`${project.title} 자세히 보기`}>
                    <ProjectArtwork project={project} />
                    <div className="project-category">{project.category}</div>
                    <h3>{project.title}</h3><p>{project.description}</p>
                    <span className="project-read-more">자세히 보기 <span aria-hidden="true">↗</span></span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>}
        {isProjectPage && <section className="project-detail page-width" aria-labelledby="project-title">
          <a className="text-link list-back" href="#/portfolio"><span aria-hidden="true">←</span> 포트폴리오 목록으로</a>
          {selectedProject ? <>
            <header className="detail-heading">
              <p className="eyebrow">PROJECT {selectedProject.number} / {selectedProject.category}</p>
              <h1 id="project-title" tabIndex={-1}>{selectedProject.title}<span>.</span></h1>
              <p className="list-description">{selectedProject.description}</p>
            </header>
            <div className="detail-banner">
              <ProjectArtwork project={selectedProject} className="detail-art" />
              <div className="detail-overview">
                <span className="example-label">실습용 예시</span>
                <h2>프로젝트 소개</h2>
                <p>{selectedProject.overview}</p>
                <p className="detail-example-note">소개와 과정은 예시입니다. 직접 만든 프로젝트의 내용과 이미지로 바꿔 보세요.</p>
              </div>
            </div>
            <div className="detail-story">
              <section className="detail-story-section" aria-labelledby="project-goal"><h2 id="project-goal"><span>01</span> 왜 만들었나요?</h2><p>{selectedProject.goal}</p></section>
              <section className="detail-story-section" aria-labelledby="project-process"><h2 id="project-process"><span>02</span> 어떻게 만들었나요?</h2><ol>{selectedProject.process.map((step) => <li key={step}>{step}</li>)}</ol></section>
              <section className="detail-story-section" aria-labelledby="project-learning"><h2 id="project-learning"><span>03</span> 무엇을 배웠나요?</h2><p>{selectedProject.learning}</p></section>
            </div>
            <div className="detail-bottom"><p>다른 작업도 둘러보세요.</p><a className="button button-primary" href="#/portfolio">목록으로 돌아가기 <span aria-hidden="true">→</span></a></div>
          </> : <div className="project-not-found"><h1 id="project-title" tabIndex={-1}>프로젝트를 찾을 수 없어요.</h1><p>주소를 확인하거나 포트폴리오 목록에서 작업을 선택해 주세요.</p><a className="button button-primary" href="#/portfolio">포트폴리오 목록 보기 <span aria-hidden="true">→</span></a></div>}
        </section>}
      </main>
      <footer className="site-footer page-width"><a className="wordmark" href="#home">my portfolio<span className="brand-dot">.</span></a><p>나의 이야기는 계속됩니다.</p><button className="back-top" type="button" onClick={() => { window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); document.getElementById('main')?.focus({ preventScroll: true }) }}>맨 위로 <span aria-hidden="true">↑</span></button></footer>
    </>
  )
}

export default App
