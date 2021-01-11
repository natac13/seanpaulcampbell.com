import React from 'react'
import createPersistedState from 'use-persisted-state'
import { SOUND_ON, SOUND_ON_DEFAULT } from '../constants'

const useSoundState = createPersistedState(SOUND_ON)

interface Props {
  children: React.ReactNode
}

interface SoundContextInterface {
  setSoundOn: React.Dispatch<React.SetStateAction<boolean>>
  soundOn: boolean
}

const SoundContext = React.createContext<SoundContextInterface | undefined>(
  undefined
)

const SoundProvider: React.FC<Props> = ({ children }: Props) => {
  const [soundOn, setSoundOn] = useSoundState(SOUND_ON_DEFAULT)

  return (
    <SoundContext.Provider
      value={{
        soundOn,
        setSoundOn,
      }}
    >
      {children}
    </SoundContext.Provider>
  )
}

const useSoundContext = () => {
  const context = React.useContext(SoundContext)
  if (context === undefined) {
    throw new Error('useSoundOn must be used withing a SoundContext')
  }

  return context
}

export { SoundProvider, useSoundContext }
