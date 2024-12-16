import { inject, injectable } from "tsyringe";
import { SkillsRepository } from "../repositories/skills.repository";
import { SkillGroupsRepository } from "../repositories/skill-groups.repository";
import { UserSkillsRepository } from "../repositories/user-skills.repository";

@injectable()
export class SkillsService {
	constructor(
		@inject(SkillsRepository) private skillsRepository: SkillsRepository,
		@inject(SkillGroupsRepository) private skillGroupsRepository: SkillGroupsRepository,
		@inject(UserSkillsRepository) private userSkillsRepository: UserSkillsRepository
	) {}

	findAllSkills() {
		return this.skillsRepository.findAll();
	}

	createSkill(name: string, skillGroupId: string) {
		return this.skillsRepository.create({ name, skillGroupId });
	}

	createSkillGroup(name: string, description: string) {
		return this.skillGroupsRepository.create({ name, description });
	}

	findAllSkillsGroup() {
		return this.skillGroupsRepository.findAll();
	}

	findAll(search: string) {
		return this.skillsRepository.findAllWithGroup(search);
	}

	findAllByUserId(userId: string) {
		return this.userSkillsRepository.findAllForUser(userId);
	}

	addSkill(userId: string, skillsIds: string[]) {
		return this.userSkillsRepository.create(userId, skillsIds);
	}
}
