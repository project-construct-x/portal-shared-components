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

import { Box } from '@mui/material'
import DefaultPageHeaderImage from '../../../../assets/logo/default.jpg'
import { HeaderSubtractOption1 } from './Components/HeaderSubtractOption1'
import { HeaderSubtractOption2 } from './Components/HeaderSubtractOption2'
import { HeaderSubtractOption3 } from './Components/HeaderSubtractOption3'
import { HeaderTitle } from './Components/HeaderTitle'

export interface PageHeaderProps {
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

export const PageHeader = ({
  children,
  title,
  headerHeight = 314,
  hasSubtract = true,
  subtractOption = 'Option1',
  background = 'LinearGradient4',
  imagePath,
}: PageHeaderProps) => {
  // const { palette } = useTheme()

  const backgroundStyle = () => {
    if (background === 'LinearGradient1') {
      return {
        background: 'linear-gradient(152.33deg, #F4F3F3 4.24%, #818386 72.17%)',
      }
    }

    if (background === 'LinearGradient2') {
      return {
        background:
          'linear-gradient(145.91deg, #F0F2F5 18.42%, #B4BBC3 79.14%)',
      }
    }

    if (background === 'LinearGradient3') {
      return {
        background:
          'linear-gradient(292.62deg, #FF782C -16.38%, #FFB326 82.22%)',
      }
    }

    if (background === 'LinearGradient4') {
      return {
        background: 'linear-gradient(111.81deg, #F4E7D4 41.97%, #EC9C49 72.9%)',
      }
    }

    return {
      background: imagePath
        ? `url(${imagePath}) center/cover no-repeat`
        : `url(${DefaultPageHeaderImage}) center/cover no-repeat`,
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: headerHeight,
        position: 'relative',
        ...backgroundStyle(),
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Breadcrumb / Top Bar */}
      {children && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 80,
            background:
              'linear-gradient(292.62deg, #EADCC6  -16.38%, #E28F3E  82.22%)',
          }}
        >
          <Box
            sx={{
              maxWidth: 1200,
              px: 2.5,
              mx: 'auto',
              width: '100%',
            }}
          >
            {children}
          </Box>
        </Box>
      )}

      {/* Title Section */}
      <Box
        sx={{
          maxWidth: 1200,
          px: 2.5,
          mx: 'auto',
          pt: 1,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <HeaderTitle title={title} />
      </Box>

      {/* Decorative Subtract Shape */}
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
