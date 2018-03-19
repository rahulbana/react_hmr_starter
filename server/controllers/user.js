import User from '../models/user'

export const getUser = async (ctx) => {
	const users = await User.find({})
	if (!users) {
		throw new Error("There was an error retrieving your user.")
	} else {
		ctx.body = users
	}
}

export const getUserById = async (ctx) => {
	const user = await User.findOne({ _id: ctx.params.id })
	if (!user) {
		throw new Error("There was an error retrieving your user.")
	} else {
    ctx.status = 200
		ctx.body = user
	}
}

export const createUser = async (ctx) => {
	const result = await User.create({
		name: ctx.request.body.name
	})
	if (!result) {
		throw new Error('User failed to create.')
	} else {
    ctx.status = 201
		ctx.body = {message: 'User created!', data: result}
	}
}

export const updateUser = async (ctx) => {
	const searchById = { _id: ctx.params.id  }
	const update = {name: ctx.request.body.name}
  console.log(update)
	const result = await User.findOneAndUpdate(searchById, update)
	if (!result) {
		throw new Error('User failed to update.')
	} else {
		console.log(result)
    const user = await User.findOne({ _id: ctx.params.id })
    if (!user) {
  		throw new Error("There was an error retrieving your user.")
  	} else {
      ctx.status = 200
  		ctx.body = {message: 'User updated!', data: user}
  	}
	}
}

export const deleteUser = async (ctx) => {
  console.log(ctx.params.id)
	const result = await User.findOneAndRemove({_id: ctx.params.id})
	if (!result) {
		throw new Error('User failed to delete.')
	} else {
		ctx.status = 200
		ctx.body = {message: 'success!'}
	}
}
