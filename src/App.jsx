import { useState, useEffect } from 'react'

const allBreeds = [
  { breed: 'スムースチワワ', shampoo: '¥5,000', cut: null },
  { breed: 'ロングチワワ', shampoo: '¥5,500', cut: '¥7,500' },
  { breed: 'スムースダックス', shampoo: '¥5,500', cut: null },
  { breed: 'ロングダックス', shampoo: '¥6,000', cut: '¥8,000' },
  { breed: 'フレンチブルドッグ', shampoo: '¥5,500', cut: null },
  { breed: 'ボストンテリア', shampoo: '¥5,500', cut: null },
  { breed: 'イタリアングレイハウンド', shampoo: '¥5,500', cut: null },
  { breed: 'ミニチュアピンシャー', shampoo: '¥5,500', cut: null },
  { breed: 'パグ', shampoo: '¥6,000', cut: null },
  { breed: 'パピヨン', shampoo: '¥6,000', cut: '¥8,000' },
  { breed: 'ペキニーズ', shampoo: '¥6,000', cut: '¥8,000' },
  { breed: 'ポメラニアン', shampoo: '¥6,300', cut: '¥8,300' },
  { breed: 'ヨークシャーテリア', shampoo: '¥6,300', cut: '¥8,800' },
  { breed: 'マルチーズ', shampoo: '¥6,300', cut: '¥8,800' },
  { breed: 'ジャックラッセルテリア', shampoo: '¥6,300', cut: '¥8,800' },
  { breed: 'ウエスティ', shampoo: '¥6,500', cut: '¥9,000' },
  { breed: 'シーズー', shampoo: '¥6,500', cut: '¥9,000' },
  { breed: 'トイプードル', shampoo: '¥6,500', cut: '¥9,000' },
  { breed: 'ミニチュアシュナウザー', shampoo: '¥7,000', cut: '¥9,500' },
  { breed: 'キャバリア', shampoo: '¥7,000', cut: '¥9,000' },
  { breed: 'ビションフリーゼ', shampoo: '¥7,500', cut: '¥10,500' },
  { breed: 'アメリカンコッカースパニエル', shampoo: '¥8,000', cut: '¥11,000' },
  { breed: '柴', shampoo: '¥8,000', cut: null },
  { breed: 'ビーグル', shampoo: '¥7,000', cut: null },
  { breed: 'コーギー', shampoo: '¥8,000', cut: null },
  { breed: 'シェルティ', shampoo: '¥9,000', cut: null },
]

const optionCategoryData = [
  {
    category: 'ケアメニュー',
    items: [
      { name: '香りボリュームシャンプー', price: '＋¥500' },
      { name: '低刺激シャンプー', price: '＋¥500' },
      { name: '肉球ケア', price: '＋¥500' },
      { name: 'はみがき', price: '＋¥700' },
      { name: 'りんご泡温浴', price: '＋¥700' },
      { name: 'シルク泡パック', price: '＋¥1,500' },
      { name: '泡あわパックセット（りんご泡温浴、シルク泡パック）', price: '＋¥2,000' },
    ],
  },
  {
    category: 'カット・仕上げ',
    items: [
      { name: 'ヒゲカット', price: '＋¥500' },
      { name: 'プー足', price: '＋¥500' },
      { name: '部分カット', price: '＋¥550' },
      { name: 'デザインカット', price: '＋¥1,000〜' },
      { name: 'オールシザー', price: '＋¥1,500〜' },
    ],
  },
  {
    category: '状態別の追加料金',
    items: [
      { name: '毛玉・もつれ', price: '＋¥500〜' },
      { name: '抜け毛', price: '＋¥500〜' },
      { name: 'サイズ', price: '＋¥500〜' },
      { name: '毛量・ロング料金', price: '＋¥500〜' },
      { name: '保定・技術料金', price: '＋¥500〜' },
    ],
  },
  {
    category: 'その他注意事項',
    notes: [
      '衛生管理のため、すべてのわんちゃんにマナーパンツの着用をお願いしております。替え用として2〜3枚ご持参ください。当店でも1枚100円で販売しております。',
      '混合ワクチンおよび狂犬病ワクチンの接種証明書のご提示をお願いしております。',
      'トリミングが少しでも楽しい時間となるよう、お気に入りのおやつやフードのご持参をおすすめしております（🐾当店でも販売しております。）',
    ],
  },
]

const faqData = [
  {
    q: '初めてでも大丈夫ですか？',
    a: 'もちろんです。初めてのサロン利用のわんちゃんも大歓迎です。事前にカウンセリングを行いますので、不安なことや気になることはお気軽にお話しください。',
  },
  {
    q: '予約はどうすればいいですか？',
    a: '当店は完全予約制です。LINE（https://lin.ee/6y99Pzi）またはお電話（070-2011-4742）にてご予約ください。\n一人で営業しておりますのでご連絡がつながりにくい場合がございます。あらかじめご了承ください。',
  },
  {
    q: '持ち物はありますか？',
    a: '初回ご利用時は、混合ワクチン（3年以内）・狂犬病ワクチン（1年以内）の接種証明書をご持参ください。\nまた、衛生管理のためすべてのわんちゃんにマナーパンツの着用をお願いしております。替え用として２〜3枚ご持参ください。（当店でも一枚100円で販売しております）\nわんちゃんが安心してトリミングに慣れていけるよう、おやつの持参もおすすめしております。',
  },
  {
    q: '営業日、営業時間を教えてください。',
    a: '火・木・土・日・祝日を基本営業日としております（不定休）。月・水・金は専門学校講師として勤務しておりますが、臨時営業の場合もございます。最新の営業日は営業カレンダーをご確認ください。\n営業時間は9:00〜18:00です。その日のご予約が終わり次第閉店となります。',
  },
  {
    q: '多頭飼いの場合、まとめて予約できますか？',
    a: '一頭ずつ丁寧に対応しておりますので、お預かり時間が通常より長くなる場合がございますが、ご一緒にお預かりすることは可能です。まずはお気軽にお問い合わせください。',
  },
  {
    q: '子犬はいつからトリミングできますか？',
    a: '当店では子犬の安全を第一に考え、３回目の混合ワクチンと、狂犬病ワクチンの接種が終わってから一週間以降のご予約をおすすめしております。（生後３〜４ヶ月ごろ）\nそれまでに「毛が目に入りそう」「爪や足裏の毛が伸びて滑ってしまう」などのお悩みがあればワクチン前でもお気軽にご相談ください。その時にできるケアをご提案いたします。',
  },
  {
    q: 'シニア犬でも利用できますか？',
    a: '当店ではシニア犬の年齢制限はしておりませんが、シニア犬のトリミングには重大な命のリスクが伴うことをご理解いただいております。\nわんちゃんの命を守るために、動物病院の空いている時間帯でのご予約や、何日かに分けての施術、飼い主様のサロン内での待機・施術へご協力をお願いする場合が多々ございます。\nこれらのお願いやリスクにご理解・ご協力いただける飼い主様のみ、お受けをさせていただいております。まずは一度、現在の健康状態やお悩みを詳しくご相談ください。',
  },
  {
    q: '人見知りや怖がりな子でも利用できますか？',
    a: 'はい、ご利用いただけます。当店ではわんちゃんのペースを大切にし、無理をさせないトリミングを心がけています。性格や苦手なことなど、事前にぜひお聞かせください。',
  },
  {
    q: 'カットのスタイルは相談できますか？',
    a: 'はい。ご来店時のカウンセリングにて、ご希望のスタイルや参考写真をもとに一緒に考えます。その子の毛質や体型に合わせた「このこらしい」スタイルをご提案します。',
  },
  {
    q: '料金表にない犬種も対応していますか？',
    a: 'はい、対応しております。当店は小型犬・中型犬のわんちゃんを中心にお受けしております。料金表に記載のない犬種やミックス犬の場合は「体の大きさ」「毛質」「状態」などによって料金を計算させていただきます。まずはお気軽にお問い合わせください。',
  },
  {
    q: 'トリミング中の様子は分かりますか？',
    a: 'お迎え時に「トリミングシート」をお渡しします。施術中の様子、頑張ったこと、体の変化など、その日の記録をまとめてお伝えします。',
  },
]

const GalleryIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="6" y="10" width="36" height="28" rx="4" stroke="#7B5C3A" strokeWidth="2" />
    <circle cx="24" cy="24" r="8" stroke="#7B5C3A" strokeWidth="2" />
    <circle cx="35" cy="13" r="2.5" fill="#7B5C3A" />
  </svg>
)

const PawIcon = ({ className }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 32 32" aria-hidden="true">
    <ellipse cx="16" cy="21" rx="7" ry="5.5" />
    <circle cx="9" cy="13.5" r="2.6" />
    <circle cx="14" cy="11" r="2.4" />
    <circle cx="18" cy="11" r="2.4" />
    <circle cx="23" cy="13.5" r="2.6" />
  </svg>
)

const CtaBar = () => (
  <div className="cta-bar">
    <a href="https://lin.ee/6y99Pzi" target="_blank" rel="noopener noreferrer" className="btn-reserve cta-bar-btn">
      ご予約はこちら
    </a>
  </div>
)

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const [openBreedTable, setOpenBreedTable] = useState(false)
  const [openOptionCat, setOpenOptionCat] = useState(null)
  const [conceptOpen, setConceptOpen] = useState(false)
  const [trimmerBioOpen, setTrimmerBioOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      entries =>
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            observer.unobserve(e.target)
          }
        }),
      { threshold: 0.12 }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const toggleFaq = i => setOpenFaq(prev => (prev === i ? null : i))
  const toggleOptionCat = i => setOpenOptionCat(prev => (prev === i ? null : i))

  return (
    <>
      {/* HEADER */}
      <header id="site-header" className={scrolled ? 'scrolled' : ''}>
        <div className="nav-logo">
          <a href="#hero">
            <img src="/画像/ロゴのみ.png" alt="Sio grooming" />
          </a>
        </div>
        <nav>
          <a href="#concept">サロンについて</a>
          <a href="#gallery">ギャラリー</a>
          <a href="#trimmer">トリマー紹介</a>
          <a href="#menu">トリミング</a>
          <a href="#faq">よくある質問</a>
          <a href="https://lin.ee/6y99Pzi" target="_blank" rel="noopener noreferrer" className="btn-reserve">ご予約はこちら</a>
        </nav>
      </header>

      {/* HERO */}
      <section id="hero">
        <div className="hero-inner">
          <img
            src="/画像/sio-grooming-logo-transparent.png"
            alt="Sio grooming やさしく かわいく このこらしく、"
            className="hero-logo-msg"
          />
          <div className="hero-snav">
            <a href="#concept" className="snav-item hero-snav-item" style={{ animationDelay: '0.85s' }}>
              <div className="snav-icon">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <circle cx="18" cy="14" r="7" stroke="#7B4A1E" strokeWidth="1.8" />
                  <path d="M6 32c0-6.627 5.373-10 12-10s12 3.373 12 10" stroke="#7B4A1E" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
              <span className="snav-en">ABOUT US</span>
              <span className="snav-jp">サロンについて</span>
            </a>
            <a href="#gallery" className="snav-item hero-snav-item" style={{ animationDelay: '1.05s' }}>
              <div className="snav-icon">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <rect x="4" y="7" width="28" height="22" rx="3" stroke="#7B4A1E" strokeWidth="1.8" />
                  <circle cx="18" cy="18" r="6" stroke="#7B4A1E" strokeWidth="1.8" />
                  <circle cx="27" cy="10" r="2" fill="#7B4A1E" />
                </svg>
              </div>
              <span className="snav-en">GALLERY</span>
              <span className="snav-jp">ギャラリー</span>
            </a>
            <a href="#trimmer" className="snav-item hero-snav-item" style={{ animationDelay: '1.2s' }}>
              <div className="snav-icon">
                <img src="/画像/トリマーアイコン.png" alt="トリマー紹介" />
              </div>
              <span className="snav-en">TRIMMER</span>
              <span className="snav-jp">トリマー紹介</span>
            </a>
            <a href="#menu" className="snav-item hero-snav-item" style={{ animationDelay: '1.35s' }}>
              <div className="snav-icon">
                <img src="/画像/シザース.png" alt="トリミング" />
              </div>
              <span className="snav-en">TRIMMING</span>
              <span className="snav-jp">トリミング</span>
            </a>
            <a href="#faq" className="snav-item hero-snav-item" style={{ animationDelay: '1.5s' }}>
              <div className="snav-icon">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <circle cx="18" cy="18" r="13" stroke="#7B4A1E" strokeWidth="1.8" />
                  <path
                    d="M14.5 14.5C14.5 12.6 16.1 11 18 11C19.9 11 21.5 12.6 21.5 14.5C21.5 16.1 20.5 17.4 18.8 17.9C18.3 18.1 18 18.5 18 19V20"
                    stroke="#7B4A1E"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <circle cx="18" cy="24" r="1.2" fill="#7B4A1E" />
                </svg>
              </div>
              <span className="snav-en">FAQ</span>
              <span className="snav-jp">よくある質問</span>
            </a>
            <a href="#access" className="snav-item hero-snav-item" style={{ animationDelay: '1.65s' }}>
              <div className="snav-icon">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <path
                    d="M18 4C13.6 4 10 7.6 10 12C10 18 18 30 18 30C18 30 26 18 26 12C26 7.6 22.4 4 18 4Z"
                    stroke="#7B4A1E"
                    strokeWidth="1.8"
                  />
                  <circle cx="18" cy="12" r="3.5" stroke="#7B4A1E" strokeWidth="1.8" />
                </svg>
              </div>
              <span className="snav-en">ACCESS</span>
              <span className="snav-jp">アクセス</span>
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <div className="features-heading reveal">
          <PawIcon className="features-heading-paw" />
          <span className="features-heading-text">当店のこだわり</span>
          <PawIcon className="features-heading-paw features-heading-paw-right" />
        </div>
        <div className="features-inner">
          <div className="feature-card reveal">
            <div className="feature-icon">
              <PawIcon className="feature-paw" />
            </div>
            <p className="feature-heading">この子の流れに寄り添う施術</p>
            <p className="feature-text">体調や気分に合わせて、負担の少ない時間を大切にします</p>
          </div>
          <div className="feature-card reveal">
            <div className="feature-icon">
              <PawIcon className="feature-paw" />
            </div>
            <p className="feature-heading">丁寧なカウンセリングと共有</p>
            <p className="feature-text">施術中の様子や気づきを、トリミングシートでお伝えします</p>
          </div>
          <div className="feature-card reveal">
            <div className="feature-icon">
              <PawIcon className="feature-paw" />
            </div>
            <p className="feature-heading">学び続ける専門的なケア</p>
            <p className="feature-text">栄養・マウスケア・老犬介護まで、幅広い知識でサポートします</p>
          </div>
        </div>
      </section>

      {/* MENU SHORTCUT */}
      <section className="menu-shortcut-section">
        <div className="menu-shortcut-inner">
          <a href="#menu" className="menu-shortcut-card reveal">
            <span className="menu-shortcut-label">料金・メニューを見る</span>
            <span className="menu-shortcut-arrow">›</span>
          </a>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery">
        <div className="section-header reveal">
          <span className="section-title-en">GALLERY</span>
          <span className="section-title-jp">インスタグラム</span>
        </div>
        <div className="gallery-inner">
          <div className="gallery-grid reveal">
            {[...Array(6)].map((_, i) => (
              <div className="gallery-placeholder" key={i}>
                <GalleryIcon />
              </div>
            ))}
          </div>
          <div className="gallery-cta reveal">
            <a
              href="https://www.instagram.com/sio_grooming"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7B4A1E" strokeWidth="1.8">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="#7B4A1E" stroke="none" />
              </svg>
              Instagramをフォローする　@sio_grooming
            </a>
          </div>
        </div>
      </section>

      {/* CTA BAR */}
      <CtaBar />

      {/* CONCEPT */}
      <section id="concept">
        <div className="section-header reveal">
          <span className="section-title-en">CONCEPT</span>
          <span className="section-title-jp">サロンについて</span>
        </div>
        <div className="concept-inner">
          <img src="/画像/犬アイコン.png" alt="" className="concept-bg-icon" aria-hidden="true" />
          <div className="concept-text reveal">
            <p>はじめまして。Sio grooming（シオ グルーミング）オーナーのshiotaです。</p>
            <p>私はトリマーとして働いてきた中でパピーからシニア犬まで、たくさんのワンちゃんたちと出会い、一頭一頭に違う「心地よいペース」があることを学びました。</p>
            <div className={`concept-expandable${conceptOpen ? ' open' : ''}`}>
              <p>
                サロン名である「Sio（しお）」には、日本語の「潮」の意味も込められています。<br />
                海の潮が太陽や月に導かれ満ち引きするように、ワンちゃんの体調や心の波も、毎日少しずつ変化するものです。
              </p>
              <p>
                だからこそ当店では、人間の都合でトリミングを進めることはいたしません。<br />
                この子の「いまの流れ」にそっと寄り添い、負担のないやさしい時間を過ごしていただくことを何よりも大切にしています。<br />
                今日はちょっとお疲れ気味だから、休憩を挟みながら。<br />
                今日は元気いっぱいだから、たくさんお話ししながら。
              </p>
              <p>飼い主様が想う「かわいい」を一緒に見つけながら、この子のペースで、この子の"いま"に合うスタイルやケアを。</p>
              <p>
                そして、当店がもうひとつ大切にしているのは、「この子の様子を飼い主様へしっかりとお伝えすること」です。<br />
                事前の丁寧なカウンセリングはもちろん、お迎えの時には、今日のトリミング中の様子やがんばったこと、気づいた体の変化などをまとめた「トリミングシート」をお渡しいたします。
              </p>
              <p>変化の大きい子犬期から、デリケートなシニア期まで。 飼い主さまと愛犬にとって、トリミングがやさしく心地いい時間に、当店が安心できる場所になれますように。</p>
              <p>この子それぞれの「このこらしさ」を、一緒に見つけていきましょう。</p>
            </div>
            <button className="concept-toggle" onClick={() => setConceptOpen(p => !p)}>
              {conceptOpen ? '閉じる' : 'もっと見る'}
            </button>
          </div>
        </div>
      </section>

      {/* TRIMMER */}
      <section id="trimmer">
        <div className="section-header reveal">
          <span className="section-title-en">TRIMMER</span>
          <span className="section-title-jp">トリマー紹介</span>
        </div>
        <div className="trimmer-cards">
          <div className="trimmer-card reveal">
            <div className="trimmer-card-top">
              <PawIcon className="trimmer-deco-paw" />
            </div>
            <p className="trimmer-name">shiota</p>
            <p className="trimmer-role">オーナートリマー　トリマー歴 8年</p>
            <p className="trimmer-pets">
              愛犬・愛猫：<span>チワワ、ビションフリーゼ、保護猫</span>
            </p>
            <div className="trimmer-bio-wrap">
              <p className="trimmer-bio-line">
                愛犬のチワワくーちゃんとの出会いをきっかけにトリマーを目指しました。
              </p>
              <div className={`trimmer-bio-expanded${trimmerBioOpen ? ' open' : ''}`}>
                <p>
                  県内サロンでのトリマー経験を活かし、わんちゃんそれぞれの流れに寄り添ったやさしいトリミングを心がけています。<br />
                  トリミングを通して、飼い主さまのもっと愛おしいを増やし、それがわんちゃんの幸せにつながるお手伝いができれば嬉しいです。<br />
                  犬や猫ペットに関する知識は日々更新されていくからこそ、常に学び続け、飼い主様が気軽に相談できる存在を目指しています。
                </p>
              </div>
            </div>
            <button className="trimmer-bio-toggle" onClick={() => setTrimmerBioOpen(p => !p)}>
              {trimmerBioOpen ? '閉じる' : 'もっと見る'}
            </button>
            <div className="trimmer-card-quals">
              <h4>資格・受賞歴</h4>
              <ul className="qual-list">
                <li>愛玩動物飼養管理士1級</li>
                <li>JKC公認トリマーライセンスC級（中国ブロック大会 最優秀技術賞・全国大会 技術賞）</li>
                <li>ペット栄養管理士</li>
                <li>マウスケアメンター</li>
                <li>老犬介護スペシャリスト講習受講</li>
                <li>ペットBLS検定</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BAR */}
      <CtaBar />

      {/* MENU */}
      <section id="menu">
        <div className="section-header reveal">
          <span className="section-title-en">TRIMMING MENU</span>
          <span className="section-title-jp">トリミング・料金表</span>
        </div>
        <div className="menu-inner">

          <div className="menu-note reveal">
            ✦ 全てのシャンプーにウルトラファインバブルシャワーが標準でついています　✦ 全て税込価格
          </div>

          {/* ベースメニュー */}
          <h3 className="menu-subtitle reveal">ベースメニュー</h3>
          <div className="reveal">
            <table className="price-table" style={{ marginBottom: '12px' }}>
              <thead>
                <tr>
                  <th>メニュー</th>
                  <th>内容</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>シャンプーセット</td>
                  <td style={{ textAlign: 'left' }}>シャンプー、ブロー、爪切り、耳掃除、肛門腺絞り</td>
                </tr>
                <tr>
                  <td>シャンプーカット</td>
                  <td style={{ textAlign: 'left' }}>シャンプーセット ＋ 全身カット</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="menu-small-note reveal">※部分カット4ヶ所以上でシャンプーカット料金になります。</p>

          {/* 犬種別料金表 */}
          <h3 className="menu-subtitle reveal">犬種別料金表</h3>
          <div className="menu-accordion reveal">
            <div className={`menu-acc-item${openBreedTable ? ' open' : ''}`}>
              <button className="menu-acc-btn" onClick={() => setOpenBreedTable(p => !p)}>
                <span className="menu-acc-label">犬種別料金一覧</span>
                <PawIcon className="menu-acc-paw" />
              </button>
              <div className="menu-acc-body">
                <div style={{ overflowX: 'auto' }}>
                  <table className="price-table">
                    <thead>
                      <tr>
                        <th>犬種</th>
                        <th>シャンプーセット</th>
                        <th>シャンプーカット</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allBreeds.map((row, j) => (
                        <tr key={j}>
                          <td>{row.breed}</td>
                          <td className="price-num">{row.shampoo}</td>
                          {row.cut ? (
                            <td className="price-num">{row.cut}</td>
                          ) : (
                            <td className="price-dash">—</td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="menu-acc-note">※当店は小型犬・中型犬専門のトリミングサロンです。上記に記載のない犬種やミックス犬の料金はお問い合わせください。<br />※持病のある子、シニア犬（13歳以上）はトリミングが負担になる場合もありますので事前にご相談ください。</p>
              </div>
            </div>
          </div>

          {/* オプション */}
          <h3 className="menu-subtitle reveal" style={{ marginTop: '40px' }}>オプション・追加料金</h3>
          <div className="menu-accordion reveal">
            {optionCategoryData.map((cat, i) => (
              <div key={i} className={`menu-acc-item${openOptionCat === i ? ' open' : ''}`}>
                <button className="menu-acc-btn" onClick={() => toggleOptionCat(i)}>
                  <span className="menu-acc-label">{cat.category}</span>
                  <PawIcon className="menu-acc-paw" />
                </button>
                <div className="menu-acc-body">
                  {cat.notes ? (
                    <div className="option-notes">
                      {cat.notes.map((note, j) => (
                        <div className="option-note-item" key={j}>
                          <PawIcon className="option-note-paw" />
                          <p>{note}</p>
                        </div>
                      ))}
                      <a href="/terms.html" className="terms-link-btn">詳しくは利用規約をご覧ください</a>
                    </div>
                  ) : (
                    <div className="option-grid">
                      {cat.items.map((item, j) => (
                        <div className="option-item" key={j}>
                          <span className="option-name">{item.name}</span>
                          <span className="option-price">{item.price}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <div className="section-header reveal">
          <span className="section-title-en">FAQ</span>
          <span className="section-title-jp">よくある質問</span>
        </div>
        <div className="faq-inner">
          {faqData.map((item, i) => (
            <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`}>
              <button className="faq-question" onClick={() => toggleFaq(i)}>
                <span className="faq-q-mark">Q</span>
                <span className="faq-q-text">{item.q}</span>
                <svg className="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div className="faq-answer">
                <span className="faq-a-mark">A</span>
                <div className="faq-a-body">
                  {item.a.split('\n').map((line, k) => <p key={k}>{line}</p>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ACCESS */}
      <section id="access">
        <div className="section-header reveal">
          <span className="section-title-en">ACCESS</span>
          <span className="section-title-jp">ご予約・アクセス</span>
        </div>
        <div className="access-inner">
          <div className="access-info">
            <div className="access-reserve reveal">
              <h4>ご予約方法（完全予約制）</h4>
              <div className="reserve-method">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7B4A1E" strokeWidth="1.8">
                  <path d="M21 11.5C21 16.19 16.97 20 12 20c-.93 0-1.83-.12-2.68-.35L4 21l1.26-4.24A8.47 8.47 0 013 11.5C3 6.81 7.03 3 12 3s9 3.81 9 8.5z" />
                </svg>
                LINE：
                <a
                  href="https://lin.ee/6y99Pzi"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--brown)', textDecoration: 'underline' }}
                >
                  友だち追加してご予約ください
                </a>
              </div>
              <div className="reserve-method">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7B4A1E" strokeWidth="1.8">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.52 12 19.79 19.79 0 011.49 3.38 2 2 0 013.47 1.21l3-.01A2 2 0 018.45 3c.24 1.34.67 2.63 1.28 3.83a2 2 0 01-.45 2.11L8.09 10.1a16 16 0 006.29 6.29l1.16-1.19a2 2 0 012.11-.45c1.2.61 2.49 1.04 3.83 1.28A2 2 0 0122 16.92z" />
                </svg>
                お電話：070-2011-4742
              </div>
            </div>
            <table className="access-table reveal">
              <tbody>
                <tr>
                  <th>店名</th>
                  <td>Sio grooming（シオ グルーミング）</td>
                </tr>
                <tr>
                  <th>住所</th>
                  <td>岡山県瀬戸内市邑久町豆田598-2</td>
                </tr>
                <tr>
                  <th>電話</th>
                  <td>
                    <span className="access-tel">070-2011-4742</span>
                  </td>
                </tr>
                <tr>
                  <th>営業時間</th>
                  <td>9:00〜18:00</td>
                </tr>
                <tr>
                  <th>営業日</th>
                  <td>火・木・土・日・祝日（不定休）</td>
                </tr>
                <tr>
                  <th>定休日</th>
                  <td>月・水・金（臨時営業あり）</td>
                </tr>
              </tbody>
            </table>
            <p className="access-calendar-note reveal">
              ※ 月・水・金は専門学校講師として勤務しておりますが、臨時で営業している場合もございます。<br />
              詳しくはInstagram（@sio_grooming）の営業カレンダーをご確認ください。
            </p>
            <a href="/terms.html" className="terms-banner reveal">
              <span className="terms-banner-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </span>
              <span className="terms-banner-text">
                <p className="terms-banner-label">ご予約前に必ずご確認ください</p>
                <p className="terms-banner-title">利用規約・注意事項はこちら</p>
              </span>
              <span className="terms-banner-arrow">›</span>
            </a>
          </div>
          <div className="access-map reveal">
            <iframe
              src="https://maps.google.com/maps?q=%E5%B2%A1%E5%B1%B1%E7%9C%8C%E7%80%AC%E6%88%B8%E5%86%85%E5%B8%82%E9%82%91%E4%B9%85%E7%94%BA%E8%B1%86%E7%94%B1598-2&z=15&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sio grooming アクセスマップ"
              style={{ border: 0 }}
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
<div className="footer-inner">
          <div className="footer-left">
            <div className="footer-logo">
              <img src="/画像/ロゴのみ.png" alt="Sio grooming" />
            </div>
            <p className="footer-catch">やさしく　かわいく　このこらしく、</p>
            <div className="footer-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.52 12 19.79 19.79 0 011.49 3.38 2 2 0 013.47 1.21l3-.01A2 2 0 018.45 3c.24 1.34.67 2.63 1.28 3.83a2 2 0 01-.45 2.11L8.09 10.1a16 16 0 006.29 6.29l1.16-1.19a2 2 0 012.11-.45c1.2.61 2.49 1.04 3.83 1.28A2 2 0 0122 16.92z" />
              </svg>
              <span className="footer-tel-num">070-2011-4742</span>
            </div>
            <p className="footer-address">
              岡山県瀬戸内市邑久町豆田598-2<br />
              営業時間：9:00〜18:00（完全予約制）<br />
              営業日：火・木・土・日・祝日
            </p>
            <div className="footer-sns">
              <a
                href="https://www.instagram.com/sio_grooming"
                target="_blank"
                rel="noopener noreferrer"
                className="sns-icon"
                aria-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <span style={{ fontSize: '13px', color: 'var(--brown-mid)' }}>@sio_grooming</span>
            </div>
            <div className="footer-license">
              <p>Sio grooming　第一種動物取扱業　保管</p>
              <p>登録番号　第26020008号</p>
              <p>動物取扱責任者　塩田　千尋</p>
              <p>登録年月日　令和8年4月27日</p>
              <p>登録の有効期限　令和13年4月26日</p>
            </div>
          </div>
          <div className="footer-nav">
            <ul>
              <li><a href="#concept">サロンについて <span>›</span></a></li>
              <li><a href="#gallery">ギャラリー <span>›</span></a></li>
              <li><a href="#trimmer">トリマー紹介 <span>›</span></a></li>
              <li><a href="#menu">トリミング <span>›</span></a></li>
              <li><a href="#faq">よくある質問 <span>›</span></a></li>
              <li><a href="#access">ご予約・アクセス <span>›</span></a></li>
              <li><a href="/terms.html">利用規約 <span>›</span></a></li>
            </ul>
          </div>
        </div>
        <p className="footer-copy">© 2025 Sio grooming All Rights Reserved.</p>
      </footer>
    </>
  )
}
