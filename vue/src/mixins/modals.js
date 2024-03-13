import { mapMutations } from "vuex";
import HelpModal from "@/components/modals/HelpModal";
import AuthorFormModal from "@/components/modals/AuthorFormModal";
import BiblioFormModal from "@/components/modals/BiblioFormModal";

export const helpModal = {
  methods: {
    ...mapMutations('modals', [
      'openModal'
    ]),
    openHelpModal (params = {}) {
      this.openModal({
        component: HelpModal,
        params
      })
    }
  }
}

export const authorsModal = {
  methods: {
    ...mapMutations('modals', [
      'openModal'
    ]),
    openNewAuthorModal () {
      this.openModal({
        component: AuthorFormModal
      })
    },
    openEditAuthorModal (params = {}) {
      this.openModal({
        component: AuthorFormModal,
        params
      })
    }
  }
}

export const biblioModal = {
  methods: {
    ...mapMutations('modals', [
      'openModal'
    ]),
    openNewBiblioModal () {
      this.openModal({
        component: BiblioFormModal
      })
    },
    openEditBiblioModal (params = {}) {
      this.openModal({
        component: BiblioFormModal,
        params
      })
    }
  }
}
