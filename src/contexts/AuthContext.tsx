import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { ReactNode, createContext, useEffect, useState } from "react";
import { storageUserSave, storageUserGet, storageUserRemove } from "@storage/storageUser";

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoadingUserStorageData: boolean;
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState({} as UserDTO)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post('/sessions', { email, password })

      if (data.user) {
        setUser(data.user)
        storageUserSave(data.user)
      }
    } catch (error) {
      throw error
    }
  }

  const signOut = async () => {
    setIsLoadingUserStorageData(true)
    try {
      setUser({} as UserDTO);
      await storageUserRemove();

    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  const loadUserData = async () => {
    try {
      const userLogged = await storageUserGet();

      if (userLogged) {
        setUser(userLogged)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])


  return (
    <AuthContext.Provider value={{
      user,
      signIn,
      isLoadingUserStorageData,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}