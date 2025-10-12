import { readonly, ref } from 'vue'

const KEY = 'AIzaSyDJtifzdi9ZJI1zsyZYCeTHXEXJlgHnLl8'
const BASE_URI = 'https://sheets.googleapis.com/v4/spreadsheets'
const SHEET_NAME = 'Sheet1'

type Link = {
  /** the human readable name for the link */
  name: string
  /** the url for link */
  url: string
}

export type Sculpture = Partial<{
  inventoryNumber: string
  title: string
  /** fabrication year of the sculpture */
  year: string
  edition: string
  medium: string
  dimensions: string
  weight: string
  /** the price of the sculpture */
  retailPrice: string
  /** the preview image displayed on the menu */
  thumbnail: string
  /** a list of urls that link to images and videos */
  media: readonly string[]
  /** where the sculpture is installed */
  location: string
  /** a summary of the sculpture / availability */
  explanation: string
  /** a link to more information / resources */
  link: Partial<Link>
}> & {
  /** for in-application processing only */
  id: number
}

const SHEETS = {
  CURRENT_INVENTORY: {
    ID: '1Ebv0L8YH1cJbdH_h00tdZtNtHfTGM8-e7ci351J09DE',
    mapper: (sheetRow: string[], index: number): Sculpture => ({
      id: index,
      inventoryNumber: sheetRow[0],
      title: sheetRow[1],
      year: sheetRow[2],
      edition: sheetRow[3],
      medium: sheetRow[4],
      dimensions: sheetRow[5],
      weight: sheetRow[6],
      retailPrice: sheetRow[7],
      thumbnail: sheetRow[8],
      media: [sheetRow[8] ?? '', ...(sheetRow[9]?.split(',') ?? [])],
    }),
  },
  PORTFOLIO: {
    ID: '1hJn2ufeFvEtAD-jXAmZJRdswR-Nj0Exy3MWtmQicFaY',
    mapper: (sheetRow: string[], index: number): Sculpture => ({
      id: index,
      title: sheetRow[0],
      year: sheetRow[1],
      medium: sheetRow[2],
      dimensions: sheetRow[3],
      weight: sheetRow[4],
      location: sheetRow[5],
      explanation: sheetRow[6],
      link: {
        name: sheetRow[7],
        url: sheetRow[8],
      },
      thumbnail: sheetRow[9],
      media: [sheetRow[9] ?? '', ...(sheetRow[10]?.split(',') ?? [])],
    }),
  },
} as const

export const useSculptureData = (sheet: keyof typeof SHEETS) => {
  const sculptures = ref<Sculpture[]>([])
  const dataUrl = `${BASE_URI}/${SHEETS[sheet].ID}/values/${SHEET_NAME}?key=${KEY}`

  const refreshSculptureData = async () => {
    const response = await fetch(dataUrl)
    const data = (await response.json()).values as string[][]

    // slice to remove header row
    const sculptureData = data.slice(1).map(SHEETS[sheet].mapper)
    sculptures.value = sculptureData

    return sculptureData
  }

  refreshSculptureData()

  return {
    sculptures: readonly(sculptures),
  }
}
