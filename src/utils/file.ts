import {parse} from 'path';
import fs from 'fs-extra';

type ReadFile = {
  exists: false;
} | {
  parsed: string;
  exists: true;
}

interface CopyFile {
  src: string;
  dest: string;
}

interface CopyFileOptions {
  override: boolean;
}

export const readFile = (path: string): ReadFile => {
  if (fs.existsSync(path)) {
    const parsed = fs.readFileSync(path, 'utf-8')
    return {
      parsed,
      exists: true,
    }
  } else {
    return {
      exists: false,
    }
  }
}

export const saveFile = (
  path: string,
  data: string | NodeJS.ArrayBufferView,
  options: CopyFileOptions = {
    override: false
  }
): void => {
  const exists = fs.existsSync(path)
  if (
    options &&
    options.override
  ) {

  } else {
    if (exists) {
      return
    }
  }
  const destDir = parse(path).dir;
  if (!fs.existsSync(destDir)) {
    fs.mkdirpSync(destDir)
  }
  fs.writeFileSync(path, data, {
    encoding: 'utf-8'
  })
}

export const copyFile = (
  src: string,
  dest: string,
  options: CopyFileOptions = {
    override: false
  }
): void => {
  const exists = fs.existsSync(dest)
  if (
    options &&
    options.override
  ) {

  } else {
    if (exists) {
      return
    }
  }
  const destDir = parse(dest).dir;
  if (!fs.existsSync(destDir)) {
    fs.mkdirpSync(destDir)
  }
  fs.copyFileSync(src, dest);
}

export const copyFiles = (
  files: CopyFile[],
  options: CopyFileOptions = {
    override: false
  }
): void => {
  let exists = false
  files.forEach((file) => {
    if (fs.existsSync(file.dest)) {
      exists = true
    }
  })
  if (
    options &&
    options.override
  ) {

  } else {
    if (exists) {
      return
    }
  }
  files.forEach((file) => {
    const destDir = parse(file.dest).dir;
    if (!fs.existsSync(destDir)) {
      fs.mkdirpSync(destDir)
    }
    fs.copyFileSync(file.src, file.dest);
  })
}
