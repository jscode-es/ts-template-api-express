# Template API ExpressJS ( Typescript )
Template of a server to offer a consumable service of a Rest API

## Module installation
```
npx ts-template-api-express
```

## 🐵 Basic use
In the server folder there is "router", a folder to manage all web requests ( get, post, put, delete ). Within each folder you can establish the consumption of static and dynamic routes.
```
📂 server
	📂 router
		📁 get
		📁 post
		📁 put
		📁 delete
```

## 📁 Static routes
Static routes are for direct consumption without passing an identifier in the route.

### Example

```
📂 server
	📂 router
		📁 get
			📁 product
				index.ts
```


## 📁 Dynamic routes
Dynamic routes are used to pass the special identifier in the url.
All dynamic routes are declared as follows, ``[id].ts``

### Example

```
📂 server
	📂 router
		📁 get
			📁 product
				[id].ts
```

## ⚙ As the mandatory return data function declares.
In both cases, both in dynamic and static routes, the function must be declared as follows.

```javascript

import { IReturn, IObject, IData } from '../types'

export const getData ({ data, req }:IData): Promise<IReturn>

```

### Example static
```javascript

// FILE_NAME: server/router/get/product/index.ts

import db from 'object_mysql'

import { IReturn, IObject, IData } from '../types'

export const getData = async ({ data, req }:IData): Promise<IReturn>
{
	const { Product } = await db()

	const { error, result } = await Product.get({limit:10})

	return { status:200, error, result}
}

```

### Example dynamic
```javascript

// FILE_NAME: server/router/get/product/[id].ts

import db from 'object_mysql'

import { IReturn, IObject, IData } from '../types'

export const getData = async ({ data, req }:IData): Promise<IReturn>
{
	const { id } = data

	const { Product } = await db()

	const { error, result } = await Product.getById(id)

	return { status:200, error, result}
}

```

## 📓 Module typing
Below is the typing of the modules
```javascript

import { Request } from 'express'

export interface IObject {
	[key: string]: string | number | boolean
}

export interface IRequest extends Request {
	isJsonRequest?: boolean;
	ipClient?: string | string[];
	data?: IObject;
	lang?: string;
}

export interface ICustomEnv extends NodeJS.ProcessEnv {
	port?: string;
	host?: string;
	limit_json?: string;
}

export interface IReturn 
{
	status:number // Http status code
	error?:string[]
	result?:string|number|boolean|IObject
}

export interface IData 
{
	data:IObject
	request:IRequest
}


```