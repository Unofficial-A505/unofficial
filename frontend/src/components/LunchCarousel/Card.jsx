import styles from "./Card.module.css";

export default function Card({ lunchZip }) {
  // 메뉴 3개씩 슬라이드에 담아주는 함수
  const chunkSize = 3;
  const chunkArray = (arr, size) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArray.push(arr.slice(i, i + size));
    }
    return chunkedArray;
  };

  const slides = chunkArray(lunchZip, chunkSize);
  console.log("slides", slides);

  return (
    <div className={styles.card}>
      <div className={styles.title}>
        <p>{lunchZip[0].local} 캠퍼스</p>
      </div>
      <div id="carouselExampleIndicators" class="carousel slide">
        <div class="carousel-inner">
          {slides.map((slide, index) => (
            <div
              className={"carousel-item " + (index === 0 && "active")}
              key={index}
            >
              <div className={styles.menus}>
                {slide.map((menu, menuIndex) => (
                  <Menu key={menuIndex} menu={menu} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

function Menu({ menu }) {
  const { name, cal } = extractNameCal(menu.name);

  return (
    <div className={styles.menu}>
      <img style={{ objectFit: "cover" }} src={menu.imageUrl} alt={name} />
      <div className="d-flex justify-content-between mb-1">
        <p>{menu.courseName}</p>
        <p>{cal}kcal</p>
      </div>
      <h2 className="mb-1">{name}</h2>
      <p className={styles.detail}>{menu.detail}</p>
    </div>
  );
}

// '만둣국 (1367)' => name:'만둣국', cal:'1367'로 parsing
function extractNameCal(string) {
  const regex = /(.+) \(([\d,]+)\)/;
  const match = string.match(regex);

  if (match) {
    const name = match[1].trim();
    const cal = match[2].trim();
    return { name, cal };
  }
  return { name: string, cal: null };
}
