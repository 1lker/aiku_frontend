export interface Option {
  text: string
  description: string
}

export interface Question {
  day: number
  startTime: string
  endTime: string
  options: Option[]
}

// Mock: fetch a questionnaire definition from server
export async function fetchMockQuestionnaire(): Promise<Question[]> {
  const data: Question[] = [
    {
      day: 2,
      startTime: '08:00',
      endTime: '09:00',
      options: [
        {
          text: 'Otele yakın bir kafede geleneksel Alman kahvaltısı (brötchen, peynir, salam).',
          description: 'Hızlı ve lezzetli bir başlangıç; yerel tatları deneyimlemek isteyenler için ideal.',
        },
        {
          text: 'Café Einstein Berlin’de klasik Avusturya kahvaltısı (omlet, kahve, taze hamur işleri).',
          description: 'Atmosferi ve zengin kahvaltısı ile kahve severler ve klasik Avusturya mutfağı meraklıları için harika.',
        },
        {
          text: 'Müzeler Adası çevresinde hızlı bir takeaway kahvaltı (sandviç ve kahve).',
          description: 'Sabah turuna hızlıca başlamanızı sağlar, zaman kazanmak isteyenler için uygun.',
        },
        {
          text: 'Otelde kahvaltı yapıp sabah yürüyüşü için Tiergarten Park’a kısa bir yürüyüş.',
          description: 'Rahat ve sakin bir başlangıç; doğa yürüyüşü ile güne enerji dolu başlamak isteyenler için ideal.',
        },
      ],
    },
    {
      day: 2,
      startTime: '09:00',
      endTime: '12:00',
      options: [
        {
          text: 'Müze Adası’nda Pergamon Müzesi ve Eski Müze turu.',
          description: 'Sanatseverler ve tarih meraklıları için dünyaca ünlü eserleri görebileceğiniz kapsamlı bir tur.',
        },
        {
          text: 'Berlin Katedrali ve Lustgarten çevresinde rehberli yürüyüş.',
          description: 'Tarihi mimariyi ve çevredeki tarihi dokuyu keşfetmek isteyenler için ideal.',
        },
        {
          text: 'Neues Museum ve Bode Müzesi ziyareti (antik eserler ve heykeller).',
          description: 'Eski uygarlıklar ve heykel sanatına ilgi duyanlar için etkileyici bir deneyim.',
        },
        {
          text: 'Berlin Devlet Opera Binası’nda rehberli tur veya kısa bir fotoğraf turu.',
          description: 'Sanat ve mimari meraklıları için harika bir seçenek; fotoğraf çekmeyi sevenler için ideal.',
        },
      ],
    },
    {
      day: 2,
      startTime: '12:00',
      endTime: '14:00',
      options: [
        {
          text: 'Hackescher Markt civarında Alman mutfağı restoranı (sosis ve patates).',
          description: 'Klasik Alman lezzetlerini deneyimlemek isteyenler için mükemmel bir seçenek.',
        },
        {
          text: 'Markthalle Neun’de street food ve uluslararası lezzetler.',
          description: 'Farklı mutfakları denemek ve hareketli bir ortamda yemek yemek isteyenler için ideal.',
        },
        {
          text: 'Prenzlauer Berg’de kafede hafif bir brunch (salata, sandviç, kahve).',
          description: 'Daha sakin ve hafif bir öğle yemeği tercih edenler için uygun.',
        },
        {
          text: 'Spree Nehri kenarında piknik veya takeaway atıştırmalık.',
          description: 'Manzaralı ve rahat bir ortamda yemek keyfi yapmak isteyenler için harika.',
        },
      ],
    },
    {
      day: 2,
      startTime: '14:00',
      endTime: '17:00',
      options: [
        {
          text: 'Berlin Duvarı Anıtı ve East Side Gallery gezisi.',
          description: 'Tarihi ve sanatı bir arada görmek isteyenler için unutulmaz bir deneyim.',
        },
        {
          text: 'Topography of Terror müzesi ve Nazizm tarihi turu.',
          description: 'Berlin’in karanlık tarihini anlamak ve öğrenmek isteyenler için bilgilendirici bir seçenek.',
        },
        {
          text: 'Gendarmenmarkt meydanında fotoğraf ve kısa yürüyüş.',
          description: 'Mimari güzellikleri fotoğraflamak ve kısa bir yürüyüş yapmak isteyenler için ideal.',
        },
        {
          text: 'Hackesche Höfe avlularında alışveriş ve sokak sanatı keşfi.',
          description: 'Alışveriş yapmak ve modern Berlin kültürünü deneyimlemek isteyenler için eğlenceli bir seçenek.',
        },
      ],
    },
    {
      day: 2,
      startTime: '17:00',
      endTime: '19:00',
      options: [
        {
          text: 'Otelde kısa bir dinlenme ve kahve.',
          description: 'Günün yorgunluğunu atmak ve enerji toplamak isteyenler için ideal.',
        },
        {
          text: 'Tiergarten veya Tempelhofer Feld’de yürüyüş.',
          description: 'Doğa ile iç içe sakin bir yürüyüş yapmak isteyenler için harika bir seçenek.',
        },
        {
          text: 'Prenzlauer Berg veya Kreuzberg’de kafede atıştırma ve kahve keyfi.',
          description: 'Şehir yaşamını gözlemlemek ve rahatlamak isteyenler için uygun.',
        },
        {
          text: 'Spree Nehri kıyısında yürüyüş ve fotoğraf çekimi.',
          description: 'Manzara eşliğinde yürümek ve güzel fotoğraflar çekmek isteyenler için ideal.',
        },
      ],
    },
    {
      day: 2,
      startTime: '19:00',
      endTime: '22:00',
      options: [
        {
          text: 'Markthalle Neun veya Kreuzberg’de Alman mutfağı akşam yemeği.',
          description: 'Klasik Alman yemeklerini tatmak ve yerel lezzetleri deneyimlemek isteyenler için mükemmel.',
        },
        {
          text: 'Friedrichshain’da uluslararası mutfak veya tapas restoranları.',
          description: 'Farklı mutfakları deneyimlemek ve sosyal bir ortamda akşam geçirmek isteyenler için ideal.',
        },
        {
          text: 'Berlin Lights veya açık hava gece turuna katılmak (yaklaşık 2 saat).',
          description: 'Berlin’in gece ışıkları ve manzarasını görmek isteyenler için unutulmaz bir deneyim.',
        },
        {
          text: 'Bar veya lounge’da canlı müzik ve kokteyl keyfi (ör: Klunkerkranich rooftop).',
          description: 'Gece hayatını keşfetmek ve canlı müzik eşliğinde keyifli bir akşam geçirmek isteyenler için harika.',
        },
      ],
    },
  ]

  // Simulate network latency
  await new Promise((r) => setTimeout(r, 200))
  return data
}

// Mock: send selection to server
export async function mockSubmitSelection(
  questionIndex: number,
  option: Option,
  meta?: { day: number; startTime: string; endTime: string },
): Promise<void> {
  // Simulate network request
  await new Promise((r) => setTimeout(r, 120))
  // For demonstration, print the selected option
  // eslint-disable-next-line no-console
  if (meta) {
    console.log(
      `[Question ${questionIndex + 1}] (Day ${meta.day} ${meta.startTime}-${meta.endTime}) Selected:`,
      option.text,
    )
  } else {
    console.log(`[Question ${questionIndex + 1}] Selected:`, option.text)
  }
}

// Mock: print full selection contents to console
export async function mockLogSelectionContents(
  questionIndex: number,
  option: Option,
  meta?: { day: number; startTime: string; endTime: string },
): Promise<void> {

  console.log('Selection contents:', {
    question: questionIndex + 1,
    meta,
    option,
  })
}


