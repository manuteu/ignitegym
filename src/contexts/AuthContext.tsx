import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { ReactNode, createContext, useEffect, useState } from "react";
import { storageUserSave, storageUserGet, storageUserRemove } from "@storage/storageUser";
import { storageAuthTokenSave, storageAuthTokenGet, storageAuthTokenRemove } from "@storage/storageAuthToken";

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

  const updateUserAndToken = (userData: UserDTO, token: string) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setUser(userData);
  }

  const storageUserAndTokenSave = async (userData: UserDTO, token: string) => {
    try {
      setIsLoadingUserStorageData(true)

      await storageUserSave(userData)
      await storageAuthTokenSave(token);
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post('/sessions', { email, password })

      if (data.user && data.token) {
        await storageUserAndTokenSave(data.user, data.token)
        updateUserAndToken(data.user, data.token)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  const signOut = async () => {
    setIsLoadingUserStorageData(true)
    try {
      setUser({} as UserDTO);
      await storageUserRemove();
      await storageAuthTokenRemove();
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  const loadUserData = async () => {
    try {
      setIsLoadingUserStorageData(true);

      const userLogged = await storageUserGet();
      const token = await storageAuthTokenGet()

      if (token && userLogged) {
        updateUserAndToken(userLogged, token)
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