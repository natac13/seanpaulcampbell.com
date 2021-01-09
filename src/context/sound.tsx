import React from 'react'
import createPersistedState from 'use-persisted-state'

const useSoundState = createPersistedState('SOUND_ON')

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
  const [soundOn, setSoundOn] = useSoundState(false)

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
