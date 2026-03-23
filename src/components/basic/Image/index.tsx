/********************************************************************************
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

import { useEffect, useState, useCallback } from 'react'
import LogoInGray from '../../../assets/logo/construct-x-gray.svg?url'

export const LogoGrayData = LogoInGray

export const TransparentPixel =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

const IMAGE_TYPES: Record<string, string> = {
  '3c': 'image/svg+xml',
  ffd8ff: 'image/jpeg',
  '89504e': 'image/png',
  474946: 'image/gif',
}

const buf2hex = (buffer: ArrayBuffer): string =>
  [...new Uint8Array(buffer)]
    .map((x) => x.toString(16).padStart(2, '0'))
    .join('')

const defaultFetchImage = async (url: string): Promise<ArrayBuffer> => {
  const response = await fetch(url)
  return await response.arrayBuffer()
}

interface ImageProps {
  src: string
  alt?: string
  style?: React.CSSProperties
  loader?: (src: string) => Promise<ArrayBuffer>
  onError?: (e: Error) => void
}

export const Image = ({
  src,
  alt,
  style,
  loader,
  onError,
}: ImageProps): JSX.Element => {
  const [data, setData] = useState(LogoGrayData)
  const [error, setError] = useState(false)

  const getData = useCallback(async () => {
    try {
      const buffer = await (loader ? loader(src) : defaultFetchImage(src))
      const firstByte = buf2hex(buffer.slice(0, 1))
      const first3Bytes = buf2hex(buffer.slice(0, 3))
      const imageType =
        IMAGE_TYPES[firstByte] ?? IMAGE_TYPES[first3Bytes] ?? 'image/*'
      setData(URL.createObjectURL(new Blob([buffer], { type: imageType })))
    } catch (e) {
      // defining default error handler
      onError ? onError(e as Error) : console.error(e)
      setData(LogoGrayData)
    }
  }, [src, loader])

  useEffect(() => {
    void getData()
  }, [getData])

  // Check if this is specifically the LogoInGray image
  const isLogoImage = src === LogoGrayData || (error && data === LogoGrayData)

  return (
    <img
      src={(loader ?? error) ? data : src}
      alt={alt ?? 'Construct-X'}
      onError={() => {
        setError(true)
        setData(LogoGrayData)
      }}
      style={{
        ...(isLogoImage
          ? {
              objectFit: 'contain',
              width: '70%',
              height: '70%',
              display: 'block',
              margin: '0 auto',
            }
          : {
              objectFit: 'cover',
              width: '60px',
              height: 'auto',
            }),
        borderRadius: '0',
        ...style,
      }}
    />
  )
}
