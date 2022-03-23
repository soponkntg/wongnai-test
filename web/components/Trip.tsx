import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { TripInterface } from '../interface'

interface Props extends TripInterface {
  onClickTag(value: string): Promise<void>
}

const Trip = ({ title, url, description, photos, tags, onClickTag }: Props) => {
  const [head, ...tail] = photos
  return (
    <div className="my-8 grid grid-cols-1 gap-y-6 md:grid-cols-3 md:gap-8">
      <div className="mx-auto w-60">
        <Image
          src={head}
          width={200}
          height={300}
          layout="responsive"
          objectFit="cover"
          className="rounded-xl"
        />
      </div>
      <div className="col-span-2 flex flex-col justify-between gap-y-4 px-4">
        <Link href={url}>
          <h3 className="text-2xl font-bold hover:cursor-pointer">{title}</h3>
        </Link>
        <p className="text-slate-500">
          {description} ....{' '}
          <Link href={url}>
            <span className="text-sky-500 underline hover:cursor-pointer">
              อ่านต่อ
            </span>
          </Link>
        </p>
        <p className="text-sm text-slate-500">
          หมวด -{' '}
          {tags.map((value, index, arr) => {
            if (index === arr.length - 1) {
              return (
                <React.Fragment key={index}>
                  <span className="text-sm text-slate-500">และ </span>
                  <span
                    className="text-sm text-slate-500 underline hover:cursor-pointer"
                    onClick={async () => {
                      await onClickTag(value)
                    }}
                  >
                    {value}
                  </span>
                </React.Fragment>
              )
            }
            return (
              <React.Fragment key={index}>
                <span
                  className="text-sm text-slate-500 underline hover:cursor-pointer"
                  onClick={async () => {
                    await onClickTag(value)
                  }}
                >
                  {value}
                </span>
                <span>, </span>
              </React.Fragment>
            )
          })}
        </p>
        <div className="flex gap-x-4">
          {tail.map((value, index) => (
            <Image
              key={index}
              src={value}
              width={100}
              height={100}
              className="rounded-xl"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Trip
