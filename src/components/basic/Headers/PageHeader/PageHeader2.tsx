/********************************************************************************
 * Copyright (c) 2023 BMW Group AG
 * Copyright (c) 2023 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import { Box, useTheme } from '@mui/material'
// import { mainNavigationHeight } from '../../MainNavigation'
import DefaultPageHeaderImage from '../../../../assets/logo/default.jpg'
import { HeaderSubtractOption1 } from './Components/HeaderSubtractOption1'
import { HeaderSubtractOption2 } from './Components/HeaderSubtractOption2'
import { HeaderSubtractOption3 } from './Components/HeaderSubtractOption3'
import { HeaderTitle } from './Components/HeaderTitle'

export interface PageHeaderProp {
  children?: React.ReactNode
  title?: string
  topPage?: boolean
  headerHeight?: number
  hasSubtract?: boolean
  subtractOption?: 'Option1' | 'Option2' | 'Option3'
  background?:
    | 'Image'
    | 'LinearGradient1'
    | 'LinearGradient2'
    | 'LinearGradient3'
    | 'LinearGradient4'
  imagePath?: string
}

export const PageHeader2 = ({
  children,
  title,
  topPage = false,
  // headerHeight = 314,
  hasSubtract = true,
  subtractOption = 'Option1',
  background = 'Image',
  imagePath,
}: PageHeaderProp) => {
  const { palette } = useTheme()
  // const hasChildren = !!children
  // const getTop = (): number => (hasChildren ? 73 : 153)
  // const getNotTop = () => (hasChildren ? 0 : 68)
  // const getSpacingTop = () => (hasChildren ? 0 : 12)
  // const top = topPage ? getTop() : getNotTop()
  // const height = topPage ? headerHeight + mainNavigationHeight : headerHeight
  //

  const backgroundStyle = () => {
    if (background === 'LinearGradient1') {
      return {
        direction: 152.33,
        colorFrom: '#F4F3F3 4.24%',
        colorTo: '#818386 72.17%',
      }
    } else if (background === 'LinearGradient3') {
      return {
        direction: 292.62,
        colorFrom: '#FF782C -16.38%',
        colorTo: '#FFB326 82.22%',
      }
    } else if (background === 'LinearGradient4') {
      return {
        direction: 111.81,
        colorFrom: '#9EABA9 41.97%',
        colorTo: '#B6A763 72.9%',
      }
    } else if (background === 'LinearGradient2') {
      return {
        css: 'linear-gradient(145.91deg, #F0F2F5 18.42%, #B4BBC3 79.14%)',
      }
    } else {
      return {
        css: imagePath
          ? `url(${imagePath}) center/cover no-repeat`
          : `url(${DefaultPageHeaderImage}) center/cover no-repeat`,
        height: '200px',
        marginTop: '0px',
      }
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '200px  ',
        marginTop: '0px',
        position: 'relative',
        background: backgroundStyle().css,
      }}
    >
      {children && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: '80px',
            backgroundColor: palette.background.background13,
            position: 'relative',
            top: topPage ? '85px' : '0',
          }}
        >
          <Box
            sx={{
              maxWidth: '1200px',
              width: '100%',
              margin: '0 auto',
              padding: '0 20px',
            }}
          >
            {children}
          </Box>
        </Box>
      )}
      <Box
        sx={{
          maxWidth: '1200px',
          padding: '0px 20px',
          margin: '0px auto',
          paddingTop: '0px !important',
          marginTop: '0px !important',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <HeaderTitle title={title} />
      </Box>
      {subtractOption === 'Option1' && (
        <HeaderSubtractOption1 hasSubtract={hasSubtract} />
      )}
      {subtractOption === 'Option2' && (
        <HeaderSubtractOption2 hasSubtract={hasSubtract} />
      )}
      {subtractOption === 'Option3' && (
        <HeaderSubtractOption3 hasSubtract={hasSubtract} />
      )}
    </Box>
  )
}
