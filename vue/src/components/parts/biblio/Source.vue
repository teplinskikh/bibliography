<template>
  <span>{{ itemString }} <b v-if="tags">{{ tags }}</b></span>
</template>

<script>
import { authorStringShort } from "@/const/functions"
import { LABEL_TAG, SOURCE_TYPE } from "@/components/forms/BookForm"

export default {
  name: "SourceItem",
  props: {
    book: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    itemString () {
      switch (this.book.type) {
        case SOURCE_TYPE.ARTICLE_CONFERENCE: return this.strArticleConference()
        case SOURCE_TYPE.ARTICLE_MAGAZINE: return this.strArticleMagazine()
        case SOURCE_TYPE.TUTORIAL: return this.strTutorial()
        case SOURCE_TYPE.BOOK: return this.strBook()
        case SOURCE_TYPE.PATENT: return this.strPatent()
        // case SOURCE_TYPE.WEB: return this.strWeb
        // case SOURCE_TYPE.ARTICLE_MAGAZINE: return this.strArticleMagazine
        // case SOURCE_TYPE.ARTICLE_WEB: return this.strArticleWeb
        default: return ''
      }
    },
    tags () {
      if (this.book.tags && this.book.tags.length > 0) {
        return `(${this.book.tags.map(x => (LABEL_TAG[x] || x)).join(', ')})`
      }

      return ''
    },
  },
  methods: {
    authorStringShort,
    getStrAuthors (authors) {
      let bAuthors = [...authors]

      if (authors.length >= 5) {
        bAuthors = bAuthors.slice(0, 3)
      }

      let str = bAuthors.map(x => this.authorStringShort(x, true)).join(', ')

      if (authors.length >= 5) {
        str += ' [и др]'
      }

      return str
    },
    strArticleConference () {
      const ar = []

      if (this.book.authors.length > 0) {
        ar.push(this.authorStringShort(this.book.authors[0]))
      }

      if (this.book.title) {
        ar.push(this.book.title)
      }

      if (this.book.title && this.book.authors.length > 0) {
        ar.push('/')
      }

      if (this.book.authors.length > 0) {
        ar.push(this.getStrAuthors(this.book.authors))
      }

      if (this.book.conference) {
        const conference = this.book.conference

        if (this.book.authors.length > 0 || this.book.title) {
          ar.push('//')
        }

        if (conference.naming) {
          ar.push(conference.naming)
        }

        if (conference.naming && conference.subnaming) {
          ar.push(':')
        }

        if (conference.subnaming) {
          ar.push(conference.subnaming)
        }

        if ((conference.naming || conference.subnaming) && conference.city) {
          ar[ar.length-1] += ','
        }

        if (conference.city) {
          ar.push(conference.city)
        }

        if (conference.city && conference.date) {
          ar[ar.length-1] += ','
        }

        if (conference.date) {
          ar.push(conference.date)
        }

        if (conference.organization) {
          ar.push('/')
          ar.push(conference.organization)
        }

        ar[ar.length-1] += '.'
      }

      if (this.book.title && this.book.city) {
        ar.push('–')
      }

      if (this.book.city) {
        ar.push(this.book.city)
      }

      if (this.book.city && this.book.publisher) {
        ar[ar.length-1] += ':'
      }

      if (this.book.publisher) {
        ar.push(this.book.publisher)
      }

      if (this.book.publisher && this.book.year) {
        ar[ar.length-1] += ','
      }

      if (this.book.year) {
        ar.push(this.book.year + '.')
      }

      if (this.book.year && this.book.pageStart && this.book.pageEnd) {
        ar.push('– С.')
      }

      if (this.book.pageStart && this.book.pageEnd) {
        ar.push(`${this.book.pageStart}-${this.book.pageEnd}`)
      }

      ar[ar.length-1] += '.'

      return ar.join(' ')
    },
    strArticleMagazine () {
      const ar = []

      if (this.book.authors.length > 0) {
        ar.push(this.authorStringShort(this.book.authors[0]))
      }

      if (this.book.title) {
        ar.push(this.book.title)
      }

      if (this.book.title && this.book.authors.length > 0) {
        ar.push('/')
      }

      if (this.book.authors.length > 0) {
        ar.push(this.getStrAuthors(this.book.authors))
      }

      if (this.book.magazine) {
        const magazine = this.book.magazine

        if (this.book.authors.length > 0 || this.book.title) {
          ar.push('//')
        }

        if (magazine.naming) {
          ar.push(magazine.naming)
        }

        if (magazine.naming && magazine.numeration) {
          ar[ar.length-1] += '.'
        }

        if (magazine.numeration) {
          ar.push(magazine.numeration)
        }

        ar[ar.length-1] += '.'
      }

      if (this.book.title && this.book.city) {
        ar.push('–')
      }

      if (this.book.city) {
        ar.push(this.book.city)
      }

      if (this.book.city && this.book.publisher) {
        ar[ar.length-1] += ':'
      }

      if (this.book.publisher) {
        ar.push(this.book.publisher)
      }

      if (this.book.publisher && this.book.year) {
        ar[ar.length-1] += ','
      }

      if (this.book.year) {
        ar.push(this.book.year + '.')
      }

      if (this.book.year && this.book.pageStart && this.book.pageEnd) {
        ar.push('– С.')
      }

      if (this.book.pageStart && this.book.pageEnd) {
        ar.push(`${this.book.pageStart}-${this.book.pageEnd}`)
      }

      ar[ar.length-1] += '.'

      return ar.join(' ')
    },
    strTutorial () {
      const ar = []

      if (this.book.authors.length > 0) {
        ar.push(this.authorStringShort(this.book.authors[0]))
      }

      if (this.book.title) {
        ar.push(this.book.title)
        ar.push(':')
        ar.push('учеб. пособие')
      }

      if (this.book.title && this.book.authors.length > 0) {
        ar.push('/')
      }

      if (this.book.authors.length > 0) {
        ar.push(this.getStrAuthors(this.book.authors))
      }

      if (this.book.title && this.book.city) {
        ar.push('–')
      }

      if (this.book.city) {
        ar.push(this.book.city)
      }

      if (this.book.city && this.book.publisher) {
        ar[ar.length-1] += ':'
      }

      if (this.book.publisher) {
        ar.push(this.book.publisher)
      }

      if (this.book.publisher && this.book.year) {
        ar[ar.length-1] += ','
      }

      if (this.book.year) {
        ar.push(this.book.year + '.')
      }

      if (this.book.year && this.book.pagesNum) {
        ar.push('–')
      }

      if (this.book.pagesNum) {
        ar.push(`${this.book.pagesNum} c`)
      }

      ar[ar.length-1] += '.'

      return ar.join(' ')
    },
    strBook () {
      const ar = []

      if (this.book.authors.length > 0) {
        ar.push(this.authorStringShort(this.book.authors[0]))
      }

      if (this.book.title) {
        ar.push(this.book.title)
      }

      if (this.book.title && this.book.authors.length > 0) {
        ar.push('/')
      }

      if (this.book.authors.length > 0) {
        ar.push(this.getStrAuthors(this.book.authors))
      }

      if(this.book.volume.edition) {
        ar.push(this.book.volume.edition + '-е изд.')
      }

      if (this.book.title && this.book.city) {
        ar.push('–')
      }

      if (this.book.city) {
        ar.push(this.book.city)
      }

      if (this.book.city && this.book.publisher) {
        ar[ar.length-1] += ':'
      }

      if (this.book.publisher) {
        ar.push(this.book.publisher)
      }

      if (this.book.publisher && this.book.year) {
        ar[ar.length-1] += ','
      }

      if (this.book.year) {
        ar.push(this.book.year + '.')
      }

      if (this.book.year && this.book.pageStart && this.book.pageEnd) {
        ar.push('– С.')
      }

      if (this.book.pageStart && this.book.pageEnd) {
        ar.push(`${this.book.pageStart}-${this.book.pageEnd}`)
      }

      ar[ar.length-1] += '.'

      return ar.join(' ')
    },
    strPatent () {
      const ar = []

      if (this.book.patent) {
        const patent = this.book.patent
        
        ar.push('Патент')

        if (patent.registrationNumber) {
          ar.push('№')
          ar.push(patent.registrationNumber + '.')
        }

        if (this.book.title) {
          ar.push(this.book.title)
          ar.push(':')
        }

        if(patent.applicationNumber) {
          ar.push('№')
          ar.push(patent.applicationNumber)
        }

        if(patent.applicationDate) {
          ar.push(':')
          ar.push('заявл.')
          ar.push(patent.applicationDate)
        }

        if(patent.publicationDate) {
          ar.push(':')
          ar.push('опубл.')
          ar.push(patent.publicationDate)
        }

        if (this.book.authors.length > 0) {
          ar.push('/')
          ar.push(this.authorStringShort(this.book.authors[0]))
          ar.push(';')
        }

        if (patent.holder) {
          ar.push('заявитель, патентообладатель')
          ar.push(patent.holder)
        }
        
        if (this.book.pagesNum) {
          ar.push('–')
          ar.push(this.book.pagesNum)
          ar.push('с')
        }

        ar[ar.length-1] += '.'
      }

      return ar.join(' ')
    },
  }
}
</script>
